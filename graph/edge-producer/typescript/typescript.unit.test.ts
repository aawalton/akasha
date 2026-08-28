import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { type BuildContext, KEEPS_NOTHING } from "../../build-context/build-context.ts"
import fileNodeProducer from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import typescriptEdgeProducer, { IMPORT_EDGE, basesOf } from "./typescript.graph-edge-producer.code.attachment.ts"

const SCRATCH = "/var/tmp"

const REPO = "scratch"

const CONFIG = JSON.stringify({
  compilerOptions: {
    paths: {
      "~/*": ["./app/*"],
      "~/door": ["./app/parts/door.tsx"],
    },
  },
})

const ENTRY = [
  'import { plain } from "./plain.ts"',
  'import { panel } from "~/parts/panel"',
  'import { gone } from "~/parts/nowhere"',
  'import { each } from "~/parts"',
  'import { door } from "~/door"',
  'import { far } from "no-such-package/thing"',
  "export const entry = [plain, panel, gone, each, door, far]",
].join("\n")

const WRITES = [
  'import type { Panel } from "./parts/panel"',
  'const emitted = `import { plain } from "./plain.ts"`',
  "export const writes = emitted as unknown as Panel",
].join("\n")

const TRACKED: Readonly<Record<string, string>> = {
  "tsconfig.json": CONFIG,
  "app/entry.tsx": ENTRY,
  "app/plain.ts": 'import { panel } from "./parts/panel"\nexport const plain = panel\n',
  "app/parts/panel.tsx": "export const panel = 1\n",
  "app/parts/index.tsx": "export const each = 2\n",
  "app/parts/door.tsx": "export const door = 3\n",
  "app/writes.ts": WRITES,
}

function repoAt(): string {
  const root = mkdtempSync(`${SCRATCH}/typescript-`)
  execFileSync("git", ["-C", root, "init", "-q"])
  for (const [key, body] of Object.entries(TRACKED)) {
    mkdirSync(dirname(`${root}/${key}`), { recursive: true })
    writeFileSync(`${root}/${key}`, body)
  }
  execFileSync("git", ["-C", root, "add", "-A"])
  return root
}

function reachedFrom(root: string, key: string): readonly string[] {
  const ctx: BuildContext = { roots: { [REPO]: root }, said: KEEPS_NOTHING }
  const node = fileNodeProducer.at(ctx, { repo: REPO, key })
  if (node === null) throw new Error(`${key} is not a node, so nothing can be asked of it`)
  const edges = typescriptEdgeProducer.from(ctx, node)
  for (const edge of edges) {
    expect(edge.kind).toBe(IMPORT_EDGE)
    expect(edge.from).toEqual({ repo: REPO, key })
    expect(edge.to.repo).toBe(REPO)
  }
  return edges.map((edge) => edge.to.key).sort()
}

function within(run: (root: string) => void): void {
  const root = repoAt()
  try {
    run(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test("a .tsx file draws the imports it names, an extension no producer read leaving none", () => {
  within((root) => {
    expect(reachedFrom(root, "app/entry.tsx")).toEqual([
      "app/parts/door.tsx",
      "app/parts/index.tsx",
      "app/parts/panel.tsx",
      "app/plain.ts",
    ])
  })
})

test("an import reaches a .tsx file, a tail no resolution tried leaving it unreachable", () => {
  within((root) => {
    expect(reachedFrom(root, "app/plain.ts")).toEqual(["app/parts/panel.tsx"])
  })
})

test("an alias specifier reaches what the config sends it to, and an exact key beats the pattern", () => {
  within((root) => {
    expect(basesOf(root, `${root}/app/entry.tsx`, "~/parts/panel")).toEqual([
      `${root}/app/parts/panel`,
    ])
    expect(basesOf(root, `${root}/app/entry.tsx`, "~/door")).toEqual([
      `${root}/app/parts/door.tsx`,
    ])
  })
})

test("an alias with no file at the end of it draws no edge, rather than one to somewhere else", () => {
  within((root) => {
    expect(basesOf(root, `${root}/app/entry.tsx`, "~/parts/nowhere")).toEqual([
      `${root}/app/parts/nowhere`,
    ])
    expect(reachedFrom(root, "app/entry.tsx")).not.toContain("app/parts/nowhere")
  })
})

test("a specifier no alias and no package claims resolves nowhere at all", () => {
  within((root) => {
    expect(basesOf(root, `${root}/app/entry.tsx`, "no-such-package/thing")).toEqual([])
  })
})

test("a specifier written into a string draws no edge, while a type-only import draws one", () => {
  within((root) => {
    expect(reachedFrom(root, "app/writes.ts")).toEqual(["app/parts/panel.tsx"])
  })
})
