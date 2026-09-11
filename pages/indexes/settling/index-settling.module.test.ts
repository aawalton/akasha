import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
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
  NAMER_PAGE,
  type Named,
  put,
  scratch,
  textIn,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import {
  type Indexing,
  indexingAt,
  rebuiltFrom,
} from "akasha/pages/indexes/indexing/indexing.module.code.ts"
import { listedByPath, readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { indexRelation } from "akasha/pages/indexes/relation/index-relation.index.ts"
import {
  filingOf,
  mergedIn,
  settlingOver,
} from "akasha/pages/indexes/settling/index-settling.module.code.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"
import { everyFileUnder } from "akasha/testing-system/walking/walking.module.code.ts"

afterAll(scratch.sweep, 5000)

test("a merge with nothing coming answers the lines it was handed", () => {
  expect(mergedIn(["a", "c"], [])).toEqual(["a", "c"])
})

test("a merge lays each line coming into its place among the lines already in order", () => {
  expect(mergedIn(["b", "d"], ["e", "a", "c"])).toEqual(["a", "b", "c", "d", "e"])
})

test("a merge answers what sorting the two together answers", () => {
  const held = ["alpha", "beta", "gamma"]
  const coming = ["aardvark", "delta", "beta beta"]

  expect(mergedIn(held, coming)).toEqual([...held, ...coming].sort())
})

const ONE_FILE = {
  holds: () => true,
  listing: () => [],
  lines: (at: string) => (at === "one.jsonl" ? ["a", "b"] : []),
}

test("a filing leaving a file's lines as they were answers no filing", () => {
  const entries = [{ at: "one.jsonl", line: "a" }]

  expect(filingOf(ONE_FILE, entries, entries)).toEqual([])
})

test("a filing withdrawing a line the file does not hold answers no filing", () => {
  expect(filingOf(ONE_FILE, [{ at: "one.jsonl", line: "z" }], [])).toEqual([])
})

test("a filing answers the file whose lines it turns", () => {
  expect(filingOf(ONE_FILE, [{ at: "one.jsonl", line: "a" }], [])).toEqual([
    { at: "one.jsonl", lines: ["b"] },
  ])
  expect(filingOf(ONE_FILE, [], [{ at: "one.jsonl", line: "c" }])).toEqual([
    { at: "one.jsonl", lines: ["a", "b", "c"] },
  ])
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

const edgeAt = (root: string, property: string): string =>
  join(root, indexRelation.name, "page", "id", TARGET_ID, property, `${SOURCE_ID}.jsonl`)

function wrote(indexing: Indexing, tree: string, named: readonly Named[]): undefined {
  for (const [at, value] of named) {
    const body = bodyOf(value)
    indexing.wrote(put(tree, at, body), body, null)
  }
}

test("a rebuild from the pages agrees with the index a turned relation name left", () => {
  const tree = heldAt()
  const root = heldAt()
  const first = indexingAt(root, tree)
  wrote(first, tree, [...IDENTIFIERS, NAMING, CARRIER, TARGET_PAGE, SOURCE_PAGE])
  expect(first.settle()).toEqual([])
  expect(existsSync(edgeAt(root, "part-slugs"))).toBe(true)

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
  rebuiltFrom(tree, rebuilt, tree)

  expect(existsSync(edgeAt(root, "piece-slugs"))).toBe(true)
  expect(existsSync(edgeAt(root, "part-slugs"))).toBe(false)
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
  expect(existsSync(edgeAt(root, "case-page"))).toBe(true)

  const rebuilt = heldAt()
  rebuiltFrom(tree, rebuilt, tree)

  expect(existsSync(edgeAt(rebuilt, "case-page"))).toBe(true)
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

const BESIDE_AT = "akasha/one/held.module.code.part2.ts"

test("a change adding a file beside a page it leaves alone files that file under the page", () => {
  const root = indexedRepo()
  const textOf = textIn(root)
  const reading = readingIn(root)

  expect(listedByPath(reading, HELD_CODE).map((one) => one.path)).toEqual([HELD_PAGE])
  expect(listedByPath(reading, BESIDE_AT)).toEqual([])

  const settled = settlingOver(
    reading,
    root,
    [{ path: BESIDE_AT, before: null, after: "export const two = 2\n" }],
    (path) => {
      const body = textOf(path)
      return body === null ? null : valueIn(body)
    },
    textOf
  )

  expect(listedByPath(settled.reading, BESIDE_AT).map((one) => one.path)).toEqual([HELD_PAGE])
})

const MODULE_AT = "akasha/module.page-type.ts"

const MODULE_DEFAULTING = bodyOf({
  id: idOf("6"),
  pageTypeSlug: "page-type",
  slug: "module",
  extends: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "code", required: false, many: false },
    { pageProperty: "file-property/test", required: false, many: false, default: "ts" },
    { pagePropertySlug: "note", required: false, many: false },
    { pagePropertySlug: "part-slugs", required: false, many: false },
  ],
})

const HELD_TEST = "akasha/one/held.module.test.ts"

test("a file the page's type declares beside every such page is filed under that page too", () => {
  const root = indexedRepo({ [MODULE_AT]: MODULE_DEFAULTING })
  const textOf = textIn(root)
  const reading = readingIn(root)

  expect(listedByPath(reading, HELD_TEST)).toEqual([])

  const settled = settlingOver(
    reading,
    root,
    [{ path: HELD_TEST, before: null, after: "export const proved = 1\n" }],
    (path) => {
      const body = textOf(path)
      return body === null ? null : valueIn(body)
    },
    textOf
  )

  expect(listedByPath(settled.reading, HELD_TEST).map((one) => one.path)).toEqual([HELD_PAGE])
})

test("a rebuild agrees with the index a page taken from under a name left", () => {
  const tree = heldAt()
  const root = heldAt()
  const first = indexingAt(root, tree)
  wrote(first, tree, [...IDENTIFIERS, NAMING, CARRIER, TARGET_PAGE, SOURCE_PAGE])
  expect(first.settle()).toEqual([])
  expect(existsSync(edgeAt(root, "part-slugs"))).toBe(true)

  const second = indexingAt(root, tree)
  const gone = join(tree, TARGET_PAGE[0])
  second.took(gone, readFileSync(gone, "utf8"))
  rmSync(gone)
  expect(second.settle()).toEqual([])

  const rebuilt = heldAt()
  rebuiltFrom(tree, rebuilt, tree)

  expect(existsSync(edgeAt(root, "part-slugs"))).toBe(false)
  expect(butTheStamp(everyFileUnder(root))).toEqual(butTheStamp(everyFileUnder(rebuilt)))
})
