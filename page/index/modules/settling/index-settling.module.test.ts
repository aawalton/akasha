import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { everyFileUnder } from "akasha/check/test/fixture/walking/walking.test-fixture.code.ts"
import {
  type Indexing,
  indexingAt,
  refreshedFrom,
} from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  filingOf,
  settlingOver,
} from "akasha/page/index/modules/settling/index-settling.module.code.ts"
import { overlaidOn } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  butTheStamp,
  HELD_CODE,
  HELD_PAGE,
  IDENTIFIERS,
  idOf,
  indexedRepo,
  NAMER_CODE,
  NAMER_PAGE,
  type Named,
  pageOf,
  put,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"

afterAll(scratch.sweep, 5000)

const ONE_FILE = {
  holds: () => true,
  listing: () => [],
  lines: (at: string) => (at === "one.jsonl" ? ["a", "b"] : []),
  read: () => null,
}

test("a filing leaving a file's lines as they were answers no filing", () => {
  const entries = [{ at: "one.jsonl", line: "a" }]

  expect(filingOf(entries, entries)).toEqual([])
})

test("a filing answers the lines that came and the lines that went", () => {
  expect(filingOf([{ at: "one.jsonl", line: "a" }], [])).toEqual([
    { at: "one.jsonl", came: [], went: ["a"] },
  ])
  expect(filingOf([], [{ at: "one.jsonl", line: "c" }])).toEqual([
    { at: "one.jsonl", came: ["c"], went: [] },
  ])
})

test("a line withdrawn that the file does not hold leaves that file as it was", () => {
  const laid = overlaidOn(ONE_FILE, filingOf([{ at: "one.jsonl", line: "z" }], []))

  expect(laid.lines("one.jsonl")).toEqual(["a", "b"])
})

test("a line coming that the file already holds is held once", () => {
  const laid = overlaidOn(ONE_FILE, filingOf([], [{ at: "one.jsonl", line: "b" }]))

  expect(laid.lines("one.jsonl")).toEqual(["a", "b"])
})

const TARGET_ID = idOf("b")

const SOURCE_ID = idOf("a")

const NAMING = aProperty("3", "part-slugs", "relation-property", { targetPageType: "domain" })

const RENAMED: Named = [
  "piece-slugs.relation-property.ts",
  {
    id: "3",
    pageTypeSlug: "relation-property",
    slug: "piece-slugs",
    propertySlug: "part-slugs",
    targetPageType: "domain",
  },
]

const mortally = ([at, value]: Named): Named => [at, { ...value, mortal: true }]

const CARRIER = mortally(aType("4", "widget", ["domain"], ["part-slugs"]))

const CARRIER_AGAIN = mortally(aType("4", "widget", ["domain"], ["piece-slugs"]))

const TARGET_PAGE: Named = ["b.domain.ts", { id: TARGET_ID, pageTypeSlug: "domain", slug: "b" }]

const SOURCE_PAGE: Named = [
  "one.widget.ts",
  { id: SOURCE_ID, pageTypeSlug: "widget", slug: "one", partSlugs: ["domain/b"] },
]

const heldAt = (): string => scratch.rootFor("akasha-settling-")

const NOTE_AT = "akasha/note.relation-property.ts"

const notePointing = (target: string): string =>
  bodyOf({
    id: idOf("b"),
    pageTypeSlug: "relation-property",
    slug: "note",
    propertySlug: "note",
    targetPageType: target,
  })

const NAMED_BESIDE = "b.domain.referenced-by.jsonl"

const namedAt = (tree: string, property: string): boolean => {
  const at = join(tree, NAMED_BESIDE)
  if (!existsSync(at)) return false
  return readFileSync(at, "utf8").includes(`"propertySlug":"${property}"`)
}

function wrote(indexing: Indexing, tree: string, named: readonly Named[]): undefined {
  for (const [at, value] of named) {
    const body = bodyOf(value)
    indexing.wrote(put(tree, at, body), body, null)
  }
}

test("a refresh from the pages agrees with the index a turned relation name left", () => {
  const tree = heldAt()
  const root = heldAt()
  const first = indexingAt(root, tree)
  wrote(first, tree, [...IDENTIFIERS, NAMING, CARRIER, TARGET_PAGE, SOURCE_PAGE])
  expect(first.settle()).toEqual([])
  expect(namedAt(tree, "part-slugs")).toBe(true)

  const second = indexingAt(root, tree)
  const gone = join(tree, NAMING[0])
  const before = readFileSync(join(tree, CARRIER[0]), "utf8")
  const body = bodyOf(CARRIER_AGAIN[1])
  second.took(gone, readFileSync(gone, "utf8"))
  rmSync(gone)
  wrote(second, tree, [RENAMED])
  second.wrote(put(tree, CARRIER_AGAIN[0], body), body, before)
  expect(second.settle()).toEqual([])

  const rebuilt = heldAt()
  refreshedFrom(tree, rebuilt, tree)

  expect(namedAt(tree, "piece-slugs")).toBe(true)
  expect(namedAt(tree, "part-slugs")).toBe(false)
  expect(butTheStamp(everyFileUnder(root))).toEqual(butTheStamp(everyFileUnder(rebuilt)))
})

const ROW_SHAPES = aType("13", "page-property-entry", ["page-property"])

const CASE_PAGE = aProperty("6", "case-page", "relation-property", { targetPageType: "domain" })

const CASES: Named = [
  "cases.page-property-entry.ts",
  {
    id: "7",
    pageTypeSlug: "page-property-entry",
    slug: "cases",
    propertySlug: "cases",
    properties: [{ pagePropertySlug: "case-page", required: true, many: false }],
  },
]

const CASED = aType("8", "cased", ["domain"], ["cases"])

const ROW_PAGE: Named = [
  "one.cased.ts",
  { id: SOURCE_ID, pageTypeSlug: "cased", slug: "one", cases: "jsonl" },
]

const ROW_LINE = `${JSON.stringify({ id: idOf("c"), casePage: "domain/b" })}\n`

test("a relation an entry row states files an edge from the row's page", () => {
  const tree = heldAt()
  const root = heldAt()
  const indexing = indexingAt(root, tree)
  wrote(indexing, tree, [...IDENTIFIERS, ROW_SHAPES, CASE_PAGE, CASES, CASED, TARGET_PAGE])
  indexing.wrote(put(tree, "one.cased.cases.jsonl", ROW_LINE), ROW_LINE, null)
  const body = bodyOf(ROW_PAGE[1])
  indexing.wrote(put(tree, ROW_PAGE[0], body), body, null)

  expect(indexing.settle()).toEqual([])
  expect(namedAt(tree, "case-page")).toBe(true)

  const rebuilt = heldAt()
  refreshedFrom(tree, rebuilt, tree)

  expect(namedAt(tree, "case-page")).toBe(true)
  expect(butTheStamp(everyFileUnder(root))).toEqual(butTheStamp(everyFileUnder(rebuilt)))
})

test("a refusal the world already had is answered apart from the refusal a change leaves", () => {
  const root = indexedRepo({ [NOTE_AT]: notePointing("page-property") })
  const textOf = textIn(root)
  const was = textOf(NOTE_AT) ?? ""
  const now = notePointing("file-property")

  const settled = settlingOver(
    readingIn(root),
    root,
    [{ path: NOTE_AT, before: was, after: now }],
    (path) => {
      const body = textOf(path)
      return body === null ? null : valueIn(body)
    },
    textOf
  )

  expect(settled.refusedBefore).toEqual([
    `${NAMER_PAGE}: \`note\` — no page admitting \`page-property\` carries the slug \`held\``,
  ])
  expect(settled.refused).toEqual([
    `${NAMER_PAGE}: \`note\` — no page admitting \`file-property\` carries the slug \`held\``,
  ])
})

test("a refresh agrees with the index a page taken from under a name left", () => {
  const tree = heldAt()
  const root = heldAt()
  const first = indexingAt(root, tree)
  wrote(first, tree, [...IDENTIFIERS, NAMING, CARRIER, TARGET_PAGE, SOURCE_PAGE])
  expect(first.settle()).toEqual([])
  expect(namedAt(tree, "part-slugs")).toBe(true)

  const second = indexingAt(root, tree)
  const gone = join(tree, TARGET_PAGE[0])
  second.took(gone, readFileSync(gone, "utf8"))
  rmSync(gone)
  expect(second.settle()).toEqual([])

  const rebuilt = heldAt()
  refreshedFrom(tree, rebuilt, tree)

  expect(namedAt(tree, "part-slugs")).toBe(false)
  expect(butTheStamp(everyFileUnder(root))).toEqual(butTheStamp(everyFileUnder(rebuilt)))
})

const CARRIED_BESIDE = "b.domain.carried.jsonl"

const MOVED_TARGET = "far/b.domain.ts"

const MOVED_CARRIED = "far/b.domain.carried.jsonl"

const CARRIED_LINES: readonly string[] = [
  `{"id":"${TARGET_ID}"}`,
  '{"pageTypeSlug":"domain"}',
  '{"slug":"b"}',
]

const carriedIn = (tree: string, at: string): readonly string[] => {
  const held = join(tree, at)
  if (!existsSync(held)) return []
  return readFileSync(held, "utf8")
    .split("\n")
    .filter((one) => one !== "")
}

const settledWorld = (tree: string, root: string): Indexing => {
  const first = indexingAt(root, tree)
  wrote(first, tree, [...IDENTIFIERS, NAMING, CARRIER, TARGET_PAGE, SOURCE_PAGE])
  expect(first.settle()).toEqual([])
  expect(carriedIn(tree, CARRIED_BESIDE)).toEqual(CARRIED_LINES)
  return indexingAt(root, tree)
}

test("a page the change writes carries a line for every key that page states", () => {
  const tree = heldAt()
  const second = settledWorld(tree, heldAt())
  const before = readFileSync(join(tree, TARGET_PAGE[0]), "utf8")
  const body = bodyOf({ ...TARGET_PAGE[1], title: "the one" })

  second.wrote(put(tree, TARGET_PAGE[0], body), body, before)
  expect(second.settle()).toEqual([])

  expect(carriedIn(tree, CARRIED_BESIDE)).toEqual([...CARRIED_LINES, '{"title":"the one"}'])
})

test("a page the change takes away is left carrying nothing", () => {
  const tree = heldAt()
  const second = settledWorld(tree, heldAt())
  const gone = join(tree, TARGET_PAGE[0])

  second.took(gone, readFileSync(gone, "utf8"))
  rmSync(gone)
  expect(second.settle()).toEqual([])

  expect(existsSync(join(tree, CARRIED_BESIDE))).toBe(false)
})

test("a page that moves carries at its new path everything it carried at the old", () => {
  const tree = heldAt()
  const second = settledWorld(tree, heldAt())
  const gone = join(tree, TARGET_PAGE[0])
  const body = readFileSync(gone, "utf8")

  second.took(gone, body)
  rmSync(gone)
  second.wrote(put(tree, MOVED_TARGET, body), body, null)
  expect(second.settle()).toEqual([])

  expect(existsSync(join(tree, CARRIED_BESIDE))).toBe(false)
  expect(carriedIn(tree, MOVED_CARRIED)).toEqual(CARRIED_LINES)
})

test("a settle into an index that is nowhere yet answers rather than refusing an empty world", () => {
  const tree = heldAt()
  const nowhere = join(heldAt(), "nowhere")
  const [at, value] = aProperty("8", "note", "text-property")
  const body = bodyOf(value)

  const settled = settlingOver(
    readingIn(nowhere),
    tree,
    [{ path: put(tree, at, body), before: null, after: body }],
    () => null
  )

  expect(settled.reading.read(at)).toBe(body)
})

const MOVED_PAGE = "akasha/moved/held.module.ts"

const MOVED_CODE = "akasha/moved/held.module.code.ts"

const REFERENCES_LEFT = "akasha/one/held.module.referenced-by.jsonl"

const NAMER_NAMING_NOTHING = pageOf({
  id: idOf("9"),
  pageTypeSlug: "module",
  slug: "namer",
  definition: "a page importing the held code and naming no page",
  code: "ts",
})

test("a page moved from under an importer not yet repointed leaves no references where it was", () => {
  const root = indexedRepo({ [NAMER_PAGE]: NAMER_NAMING_NOTHING })
  const textOf = textIn(root)
  const page = textOf(HELD_PAGE)
  const code = textOf(HELD_CODE)
  const moving = [
    { path: HELD_PAGE, before: page, after: null },
    { path: MOVED_PAGE, before: null, after: page },
    { path: HELD_CODE, before: code, after: null },
    { path: MOVED_CODE, before: null, after: code },
  ]
  const held = new Map(moving.map((one) => [one.path, one.after] as const))
  const bodyAt = (at: string): string | null => (held.has(at) ? (held.get(at) ?? null) : textOf(at))
  expect(textOf(REFERENCES_LEFT)).toContain(NAMER_CODE)

  const settled = settlingOver(
    readingIn(root),
    root,
    moving,
    (path) => {
      const body = bodyAt(path)
      return body === null ? null : valueIn(body)
    },
    bodyAt
  )

  expect(settled.refused).toEqual([])
  expect(settled.reading.read(REFERENCES_LEFT)).toBe(null)
})

const MOVED_REFERENCES = "akasha/moved/held.module.referenced-by.jsonl"

test("a page moving takes to its new place the names it had, and leaves the imports behind", () => {
  const root = indexedRepo()
  const textOf = textIn(root)
  const page = textOf(HELD_PAGE)
  const code = textOf(HELD_CODE)
  const moving = [
    { path: HELD_PAGE, before: page, after: null },
    { path: MOVED_PAGE, before: null, after: page },
    { path: HELD_CODE, before: code, after: null },
    { path: MOVED_CODE, before: null, after: code },
  ]
  const held = new Map(moving.map((one) => [one.path, one.after] as const))
  const bodyAt = (at: string): string | null => (held.has(at) ? (held.get(at) ?? null) : textOf(at))
  const was = textOf(REFERENCES_LEFT) ?? ""
  expect(was).toContain(NAMER_PAGE)
  expect(was).toContain(NAMER_CODE)

  const settled = settlingOver(
    readingIn(root),
    root,
    moving,
    (path) => {
      const body = bodyAt(path)
      return body === null ? null : valueIn(body)
    },
    bodyAt
  )

  const now = settled.reading.read(MOVED_REFERENCES) ?? ""
  expect(now).toContain(NAMER_PAGE)
  expect(now).not.toContain(NAMER_CODE)
})
