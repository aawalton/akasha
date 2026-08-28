import { expect, test } from "bun:test"
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import type { Declared, Page } from "../query/query.ts"
import { addressIn } from "./address.ts"
import { rowPagesIn, type Where } from "./row-pages.ts"
import type { Unread } from "./pages.ts"

const NOW = 0

const DECLARED: Declared = {
  properties: {
    slug: { type: { kind: "text" } },
    seat: { type: { kind: "text" } },
    weight: { type: { kind: "number" } },
    live: { type: { kind: "boolean" } },
  },
  beyond: {},
}

const REPO = "scratch"

const HOLDER = "pages/day/monday.log-day.md"

const rootOf = (sidecars: Readonly<Record<string, string>>): string => {
  const root = mkdtempSync("/var/tmp/pages-system-row-pages-")
  mkdirSync(`${root}/pages/day`, { recursive: true })
  writeFileSync(`${root}/${HOLDER}`, "---\nslug: monday\n---\n")
  for (const [name, text] of Object.entries(sidecars)) {
    writeFileSync(`${root}/pages/day/${name}`, text)
  }
  return root
}

const WHERE: readonly Where[] = [{ at: addressIn(REPO, HOLDER), key: "lines" }]

const read = (root: string): readonly (Page | Unread)[] => [
  ...rowPagesIn({ repo: REPO, root }, WHERE, DECLARED, NOW),
]

const pages = (found: readonly (Page | Unread)[]): readonly Page[] =>
  found.filter((one): one is Page => !("unread" in one))

const inRoot = <T>(sidecars: Readonly<Record<string, string>>, act: (root: string) => T): T => {
  const root = rootOf(sidecars)
  try {
    return act(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test("a row becomes a page holding what it states, under the declared types", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a","seat":"vera","weight":"3","live":"true"}\n` }, (root) => {
    const [one] = pages(read(root))
    expect(one?.values.properties["seat"]).toEqual({ kind: "text", text: "vera" })
    expect(one?.values.properties["weight"]).toEqual({ kind: "number", number: 3 })
    expect(one?.values.properties["live"]).toEqual({ kind: "boolean", boolean: true })
  })
})

test("a key the page type declares and the row states nothing under holds nothing", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a"}\n` }, (root) => {
    const [one] = pages(read(root))
    expect(one?.values.properties["seat"]).toEqual({ kind: "absent" })
  })
})

test("a key the row states and the page type does not declare is not answered", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a","undeclared":"x"}\n` }, (root) => {
    const [one] = pages(read(root))
    expect(one?.values.properties["undeclared"]).toBeUndefined()
  })
})

test("the moment a page is read at is the one it was given", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a"}\n` }, (root) => {
    expect(pages(read(root))[0]?.values.now).toBe(NOW)
  })
})

test("the rows of every part of a split sidecar are answered, in order", () => {
  inRoot(
    {
      "monday.log-day.lines.jsonl": `{"slug":"a"}\n`,
      "monday.log-day.lines.part2.jsonl": `{"slug":"b"}\n`,
      "monday.log-day.lines.part3.jsonl": `{"slug":"c"}\n`,
    },
    (root) => {
      const found = pages(read(root)).map((one) => one.values.properties["slug"])
      expect(found).toEqual([
        { kind: "text", text: "a" },
        { kind: "text", text: "b" },
        { kind: "text", text: "c" },
      ])
    }
  )
})

test("a holder page holding no sidecar under the key holds no pages", () => {
  inRoot({ "monday.log-day.trims.jsonl": `{"slug":"a"}\n` }, (root) => {
    expect(read(root)).toEqual([])
  })
})

test("a line that is not a row is answered as unread rather than dropped", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a"}\nnot json\n{"slug":"b"}\n` }, (root) => {
    const found = read(root)
    expect(found.length).toBe(3)
    expect(found.filter((one) => "unread" in one).length).toBe(1)
  })
})

test("a page's address carries its repository, its sidecar, and the name its row states", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"morning"}\n` }, (root) => {
    expect(pages(read(root))[0]?.at).toBe("scratch:pages/day/monday.log-day.lines.jsonl#morning")
  })
})

test("a holder addressed in another repository answers one unread rather than no rows", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a"}\n` }, (root) => {
    const elsewhere: readonly Where[] = [{ at: addressIn("elsewhere", HOLDER), key: "lines" }]
    const found = [...rowPagesIn({ repo: REPO, root }, elsewhere, DECLARED, NOW)]
    expect(found.length).toBe(1)
    expect(found.every((one) => "unread" in one)).toBe(true)
  })
})

test("reading the pages twice answers them twice", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a"}\n{"slug":"b"}\n` }, (root) => {
    const held = rowPagesIn({ repo: REPO, root }, WHERE, DECLARED, NOW)
    expect([...held].length).toBe(2)
    expect([...held].length).toBe(2)
  })
})

test("a reader may stop early and leave the rest of the sidecar unread", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a"}\n{"slug":"b"}\n{"slug":"c"}\n` }, (root) => {
    const taken: string[] = []
    for (const one of rowPagesIn({ repo: REPO, root }, WHERE, DECLARED, NOW)) {
      if ("unread" in one) continue
      taken.push(one.at)
      break
    }
    expect(taken.length).toBe(1)
  })
})

test("no holder at all holds no pages", () => {
  inRoot({ "monday.log-day.lines.jsonl": `{"slug":"a"}\n` }, (root) => {
    expect([...rowPagesIn({ repo: REPO, root }, [], DECLARED, NOW)]).toEqual([])
  })
})
