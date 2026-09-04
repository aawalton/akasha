import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  type Entried,
  entriedAmong,
  entriedValue,
  entriesAt,
  entriesIn,
} from "./page-entries.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const REPO = join(import.meta.dir, "..", "..", "..")

const REAL = "agents/models/tests/pages/restatement/restatement.model-test.ts"

const PAGE = "akasha/one/held.model-test.ts"

const CASES: Entried = {
  key: "cases",
  propertySlug: "cases",
  pageTypeSlug: "page-property-entry",
}

const PROMPT: Entried = {
  key: "prompt",
  propertySlug: "prompt",
  pageTypeSlug: "text-property",
}

function rooted(name: string, bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor(name)
  for (const [at, body] of Object.entries(bodies)) {
    const full = join(root, at)
    mkdirSync(dirname(full), { recursive: true })
    writeFileSync(full, body, "utf8")
  }
  return root
}

test("the cases beside the restatement test are answered as fourteen values", () => {
  const read = entriesAt(REPO, REAL, "cases", "jsonl")

  expect("entries" in read && read.entries.length).toBe(14)
  expect("entries" in read && read.entries[0]?.["page"]).toBe("code-lint")
  expect("entries" in read && read.entries.every((one) => typeof one["id"] === "string")).toBe(true)
})

test("one line is one value and a blank line is none", () => {
  const read = entriesIn("held.jsonl", '{"a":1}\n\n{"a":2}\n')

  expect(read).toEqual({ entries: [{ a: 1 }, { a: 2 }] })
})

test("a file holding no line at all is answered with no values", () => {
  expect(entriesIn("held.jsonl", "")).toEqual({ entries: [] })
})

test("a line that is no JSON is refused rather than left out", () => {
  const read = entriesIn("held.jsonl", '{"a":1}\nnot json\n')

  expect("refused" in read && read.refused).toContain("line 2")
  expect("refused" in read && read.refused).toContain("unknown rather than nothing")
})

test("a line holding a JSON array is refused rather than taken for a value", () => {
  expect("refused" in entriesIn("held.jsonl", "[1,2]\n")).toBe(true)
})

test("a file the page names that is not there is refused rather than answered empty", () => {
  const root = rooted("akasha-entries-gone-", { [PAGE]: "" })
  const read = entriesAt(root, PAGE, "cases", "jsonl")

  expect("refused" in read && read.refused).toContain("no file is there")
})

test("a path that is no page file is refused", () => {
  const root = rooted("akasha-entries-stray-", {})

  expect("refused" in entriesAt(root, "akasha/one/held.jsonl", "cases", "jsonl")).toBe(true)
})

test("only a declaration whose property is an entry shape is picked out", () => {
  expect(entriedAmong([PROMPT, CASES])).toEqual([CASES])
})

test("the values read beside the page are written over the extension the page states", () => {
  const root = rooted("akasha-entries-whole-", {
    [PAGE]: "",
    "akasha/one/held.model-test.cases.jsonl": '{"answer":"YES"}\n',
  })
  const value = { slug: "held", prompt: "ask", cases: "jsonl" }

  expect(entriedValue(root, PAGE, value, [PROMPT, CASES])).toEqual({
    slug: "held",
    prompt: "ask",
    cases: [{ answer: "YES" }],
  })
})

test("a value carrying no entry shape is answered as the value came in", () => {
  const root = rooted("akasha-entries-plain-", { [PAGE]: "" })
  const value = { slug: "held", prompt: "ask" }

  expect(entriedValue(root, PAGE, value, [PROMPT])).toBe(value)
})

test("a file beside the page that will not read throws rather than answering short", () => {
  const root = rooted("akasha-entries-broken-", {
    [PAGE]: "",
    "akasha/one/held.model-test.cases.jsonl": "not json\n",
  })

  expect(() => entriedValue(root, PAGE, { cases: "jsonl" }, [CASES])).toThrow("no JSON")
})

test("the values of one property are read from the numbered files in order", () => {
  const root = rooted("akasha-entries-parts-", {
    [PAGE]: "",
    "akasha/one/held.model-test.cases.jsonl": '{"at":1}\n{"at":2}\n',
    "akasha/one/held.model-test.cases.part2.jsonl": '{"at":3}\n',
    "akasha/one/held.model-test.cases.part3.jsonl": '{"at":4}\n{"at":5}\n',
  })
  const read = entriesAt(root, PAGE, "cases", "jsonl")

  expect(read).toEqual({ entries: [{ at: 1 }, { at: 2 }, { at: 3 }, { at: 4 }, { at: 5 }] })
})

test("reading stops at the first numbered file that is not there", () => {
  const root = rooted("akasha-entries-gap-", {
    [PAGE]: "",
    "akasha/one/held.model-test.cases.jsonl": '{"at":1}\n',
    "akasha/one/held.model-test.cases.part3.jsonl": '{"at":3}\n',
  })

  expect(entriesAt(root, PAGE, "cases", "jsonl")).toEqual({ entries: [{ at: 1 }] })
})

test("a numbered file that will not read refuses the whole property", () => {
  const root = rooted("akasha-entries-part-broken-", {
    [PAGE]: "",
    "akasha/one/held.model-test.cases.jsonl": '{"at":1}\n',
    "akasha/one/held.model-test.cases.part2.jsonl": "not json\n",
  })
  const read = entriesAt(root, PAGE, "cases", "jsonl")

  expect("refused" in read && read.refused).toContain("part2")
})
