import { expect, test } from "bun:test"
import {
  type Asked,
  qualifyRelationByKeyOnEveryPage,
} from "akasha/change/mechanical/page-type/change/qualify-relation-by-key-on-every-page/qualify-relation-by-key-on-every-page.change-mechanical-page-type.code.ts"
import { rowsOf } from "akasha/change/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  ledgerAt,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const TYPE = "book-section"

const TARGET = "collection"

const ONE_AT = "alan/book/one.book-section.ts"

const TWO_AT = "alan/book/two.book-section.ts"

const ONE_ROWS_AT = "alan/book/one.book-section.conditions.jsonl"

const TWO_ROWS_AT = "alan/book/two.book-section.conditions.jsonl"

const PART_TWO_AT = "alan/book/one.book-section.conditions.part2.jsonl"

const SONGS = "collection/set-songs"

const HYMNS = "collection/set-hymns"

const ASKED: Asked = {
  pageType: TYPE,
  key: "conditions",
  field: "collection",
  target: TARGET,
  by: "name",
}

const NESTED: Asked = { ...ASKED, field: "effects.collection" }

const ENTRY: Declared = {
  pagePropertySlug: "page-property-entry/book-conditions",
  pageTypeSlug: "page-property-entry",
  propertySlug: "conditions",
  key: "conditions",
  unique: null,
  declaredBy: TYPE,
  required: false,
  many: true,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

type Files = Readonly<Record<string, string>>

const COLLECTIONS: ReadonlyMap<string, Value> = new Map([
  ["alan/collection/set-songs.collection.ts", { slug: "set-songs", name: "songs" }],
  ["alan/collection/set-hymns.collection.ts", { slug: "set-hymns", name: "hymns" }],
])

const BOOKS: ReadonlyMap<string, Value> = new Map([
  [ONE_AT, { conditions: "jsonl" }],
  [TWO_AT, { conditions: "jsonl" }],
])

function bodyOf(slug: string): string {
  return `export const ${slug} = {\n  slug: "${slug}",\n  conditions: "jsonl",\n}\n`
}

function worldFor(files: Files, collections: ReadonlyMap<string, Value> = COLLECTIONS): World {
  const index = {
    kindsUnder: (of: string) => new Set([of]),
    propertiesIfNamed: (of: string) => (of === TYPE ? [ENTRY] : of === TARGET ? [] : null),
    valuesByPath: (kind: string) => (kind === TYPE ? BOOKS : collections),
  } as never
  const bodies = { [ONE_AT]: bodyOf("one"), [TWO_AT]: bodyOf("two"), ...files }
  const ledger = ledgerAt("/nowhere", filesOf(bodies))
  return Object.defineProperty(ledger, "index", { value: index })
}

test("the page a bare name reaches is the page of the target stating that name under by", () => {
  const world = worldFor({ [ONE_ROWS_AT]: rowsOf([{ collection: "songs" }]) })

  const said = qualifyRelationByKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe(`{"collection":"${SONGS}"}\n`)
})

test("a name no target page states refuses the whole change, naming the file it is in", () => {
  const world = worldFor({ [ONE_ROWS_AT]: rowsOf([{ collection: "psalms" }]) })

  const said = qualifyRelationByKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(ONE_ROWS_AT)
  expect(said.refused ?? "").toContain("`psalms`")
})

test("a name two target pages state under by refuses the whole change", () => {
  const twice = new Map([
    ...COLLECTIONS,
    ["alan/collection/more.collection.ts", { slug: "more", name: "songs" }],
  ])
  const world = worldFor({ [ONE_ROWS_AT]: rowsOf([{ collection: "songs" }]) }, twice)

  const said = qualifyRelationByKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names both")
})

test("the field is a path of keys walked down each row, and a list met on it is walked", () => {
  const row = { id: "a", effects: [{ collection: "songs" }, { collection: "hymns" }] }
  const world = worldFor({ [ONE_ROWS_AT]: rowsOf([row]) })

  const said = qualifyRelationByKeyOnEveryPage(world, NESTED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_ROWS_AT) ?? "").toBe(
    `{"id":"a","effects":[{"collection":"${SONGS}"},{"collection":"${HYMNS}"}]}\n`
  )
})

test("a name already stating its page type is passed over", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: rowsOf([{ collection: SONGS }]),
    [TWO_ROWS_AT]: rowsOf([{ collection: "hymns" }]),
  })

  const said = qualifyRelationByKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([TWO_ROWS_AT])
})

test("every part of the file beside the page is written", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: rowsOf([{ collection: "songs" }]),
    [PART_TWO_AT]: rowsOf([{ collection: "hymns" }]),
  })

  const said = qualifyRelationByKeyOnEveryPage(world, ASKED)

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_ROWS_AT) ?? "").toContain(SONGS)
  expect(bodies.get(PART_TWO_AT) ?? "").toContain(HYMNS)
})

test("a count handed in holds how many pages one run writes", () => {
  const world = worldFor({
    [ONE_ROWS_AT]: rowsOf([{ collection: "songs" }]),
    [TWO_ROWS_AT]: rowsOf([{ collection: "hymns" }]),
  })

  const said = qualifyRelationByKeyOnEveryPage(world, { ...ASKED, atMost: 1 })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_ROWS_AT])
})

test("a page type no row of which names a page by a bare name is refused", () => {
  const world = worldFor({ [ONE_ROWS_AT]: rowsOf([{ collection: SONGS }]) })

  const said = qualifyRelationByKeyOnEveryPage(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no `book-section` names a page by a bare name under `collection`")
})

test("a key keeping no entries beside the page is refused", () => {
  const world = worldFor({})

  const said = qualifyRelationByKeyOnEveryPage(world, { ...ASKED, key: "heldBy" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `book-section` has no property under `heldBy`")
})

test("a target the index does not name is refused", () => {
  const world = worldFor({ [ONE_ROWS_AT]: rowsOf([{ collection: "songs" }]) })

  const said = qualifyRelationByKeyOnEveryPage(world, { ...ASKED, target: "shelf" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`shelf` names no page type")
})
