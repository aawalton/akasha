import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { type BuildContext, KEEPS_NOTHING } from "../../build-context/build-context.ts"
import type { EdgeInit } from "../edge-shape.ts"
import fileNodeProducer from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import frontmatterEdgeProducer, { RELATION_EDGE } from "./frontmatter.graph-edge-producer.code.attachment.ts"

const SCRATCH = "/var/tmp"

const REPO = "scratch"

const OTHER = "other"

const PAGE_TYPE = `---
page-type-slug: page-type
title: "Widget"
slug: widget
extends-slug: page
---

# Definition

- **Widget** — a thing drawn on a screen.
`

const BASE_TYPE = `---
page-type-slug: page-type
title: "Page"
slug: page
extends-slug: none
---

# Definition

- **Page** — what is recorded about one thing.
`

const WIDGET_PATH = `---
page-type-slug: page-property-definition
title: "Widget path"
slug: widget-widget-path
defined-on-slug: page-type/widget
key: widget-path
type: file
---

# Definition

- **Widget path** — the file a widget is drawn in.
`

const DRAWN_BY = `---
page-type-slug: page-property-definition
title: "Widget drawn by"
slug: widget-drawn-by
defined-on-slug: page-type/widget
key: drawn-by-slug
type: relation-slug
target-slug: page-type/widget
---

# Definition

- **Widget drawn by** — the widget this one is drawn by.
`

const TRACKED: Readonly<Record<string, string>> = {
  "pages/page-type/page.page-type.md": BASE_TYPE,
  "pages/page-type/widget.page-type.md": PAGE_TYPE,
  "pages/page-property-definition/widget-widget-path.page-property-definition.md": WIDGET_PATH,
  "pages/page-property-definition/widget-drawn-by.page-property-definition.md": DRAWN_BY,
  "code/ring.ts": "export const ring = 1\n",
  "pages/widget/other.widget.md": `---
page-type-slug: widget
title: "Other"
slug: other
---

# Definition

- **Other** — a widget standing where another can name it.
`,
}

function repoAt(pages: Readonly<Record<string, string>>, loose: readonly string[] = []): string {
  const root = mkdtempSync(`${SCRATCH}/frontmatter-`)
  execFileSync("git", ["-C", root, "init", "-q"])
  for (const [key, body] of Object.entries({ ...TRACKED, ...pages })) {
    mkdirSync(dirname(`${root}/${key}`), { recursive: true })
    writeFileSync(`${root}/${key}`, body)
  }
  execFileSync("git", ["-C", root, "add", "-A"])
  for (const key of loose) {
    mkdirSync(dirname(`${root}/${key}`), { recursive: true })
    writeFileSync(`${root}/${key}`, "export const loose = 1\n")
  }
  return root
}

function widgetSaying(body: string): Readonly<Record<string, string>> {
  return {
    "pages/widget/one.widget.md": `---
page-type-slug: widget
title: "One"
slug: one
${body}---

# Definition

- **One** — the widget under test.
`,
  }
}

function edgesOver(
  root: string,
  key = "pages/widget/one.widget.md",
  roots: Readonly<Record<string, string>> = {}
): readonly EdgeInit[] {
  const ctx: BuildContext = { roots: { [REPO]: root, ...roots }, said: KEEPS_NOTHING }
  const node = fileNodeProducer.at(ctx, { repo: REPO, key })
  if (node === null) throw new Error(`${key} is not a node, so nothing can be asked of it`)
  return frontmatterEdgeProducer.from(ctx, node)
}

function within(body: string, run: (root: string) => void, loose: readonly string[] = []): void {
  const root = repoAt(widgetSaying(body), loose)
  try {
    run(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test("a file property reaches the file it names", () => {
  within("widget-path: code/ring.ts\n", (root) => {
    expect(edgesOver(root)).toEqual([
      {
        kind: RELATION_EDGE,
        from: { repo: REPO, key: "pages/widget/one.widget.md" },
        to: { repo: REPO, key: "code/ring.ts" },
        attrs: { "relation-key": "widget-path" },
      },
    ])
  })
})

test("a file property naming its repository reaches the file in that repository", () => {
  within(`widget-path: ${REPO}:code/ring.ts\n`, (root) => {
    expect(edgesOver(root)).toEqual([
      {
        kind: RELATION_EDGE,
        from: { repo: REPO, key: "pages/widget/one.widget.md" },
        to: { repo: REPO, key: "code/ring.ts" },
        attrs: { "relation-key": "widget-path" },
      },
    ])
  })
})

test("a file property reaches a file in another repository", () => {
  const other = repoAt({})
  try {
    within(`widget-path: ${OTHER}:code/ring.ts\n`, (root) => {
      expect(edgesOver(root, "pages/widget/one.widget.md", { [OTHER]: other })).toEqual([
        {
          kind: RELATION_EDGE,
          from: { repo: REPO, key: "pages/widget/one.widget.md" },
          to: { repo: OTHER, key: "code/ring.ts" },
          attrs: { "relation-key": "widget-path" },
        },
      ])
    })
  } finally {
    rmSync(other, { recursive: true, force: true })
  }
})

test("a file property naming an untracked file draws no edge", () => {
  within("widget-path: code/loose.ts\n", (root) => {
    expect(edgesOver(root)).toEqual([])
  }, ["code/loose.ts"])
})

test("a file property naming nothing at all draws no edge", () => {
  within("widget-path: code/absent.ts\n", (root) => {
    expect(edgesOver(root)).toEqual([])
  })
})

test("a file property naming a repository nothing here holds draws no edge", () => {
  within("widget-path: elsewhere:code/ring.ts\n", (root) => {
    expect(edgesOver(root)).toEqual([])
  })
})

test("a file property listing several files reaches each", () => {
  within("widget-path:\n  - code/ring.ts\n  - code/absent.ts\n", (root) => {
    expect(edgesOver(root).map((one) => one.to.key)).toEqual(["code/ring.ts"])
  })
})

test("a file property saying none draws no edge", () => {
  within("widget-path: none\n", (root) => {
    expect(edgesOver(root)).toEqual([])
  })
})

test("a page property still reaches the page it names", () => {
  within("drawn-by-slug: widget/other\n", (root) => {
    const edges = edgesOver(root)
    expect(edges.map((one) => ({ ...one, to: { repo: one.to.repo, key: one.to.key } }))).toEqual([
      {
        kind: RELATION_EDGE,
        from: { repo: REPO, key: "pages/widget/one.widget.md" },
        to: { repo: REPO, key: "pages/widget/other.widget.md" },
        attrs: { "relation-key": "drawn-by-slug" },
      },
    ])
  })
})

test("a file property and a page property each draw their own edge", () => {
  within("widget-path: code/ring.ts\ndrawn-by-slug: widget/other\n", (root) => {
    const said = edgesOver(root)
      .map((one) => `${one.attrs["relation-key"]} ${one.to.key}`)
      .sort()
    expect(said).toEqual(["drawn-by-slug pages/widget/other.widget.md", "widget-path code/ring.ts"])
  })
})
