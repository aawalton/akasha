import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  aProperty,
  aType,
  bodyOf,
  butTheStamp,
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
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { indexRelation } from "akasha/pages/indexes/relation/index-relation.index.ts"
import { settlingOver } from "akasha/pages/indexes/settling/index-settling.module.code.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"
import { everyFileUnder } from "akasha/testing-system/walking/walking.module.code.ts"

afterAll(scratch.sweep, 5000)

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
