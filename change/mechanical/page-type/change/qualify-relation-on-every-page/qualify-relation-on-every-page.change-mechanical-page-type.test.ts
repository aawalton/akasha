import { expect, test } from "bun:test"
import { scriptures } from "akasha/alan/library/reading/scripture-collection/pages/scriptures.scripture-collection.ts"
import { scriptureCollection } from "akasha/alan/library/reading/scripture-collection/scripture-collection.page-type.ts"
import { qualifyRelationOnEveryPage } from "akasha/change/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.code.ts"
import {
  BESIDE_ASKED,
  BESIDE_UNCOMMITTED,
  BODIES,
  besideWorld,
  ENTRY_VALUES,
  FIELD_KEY,
  HOLDING_AT,
  HOLDING_BODIES,
  HOLDING_VALUES,
  holdingAt,
  holdingOf,
  LIST_KEY,
  MORE_ROWS_AT,
  NOTHING_BARE,
  ONE_AT,
  ONE_KEY,
  PAGES,
  PART_TWO_AT,
  pageOf,
  RECORD_KEY,
  ROW_FIELD,
  ROWS_AT,
  rowsOf,
  SONGS,
  sectionAt,
  TEXT_KEY,
  TWICE,
  TWO_AT,
  TWO_ENTRY_VALUES,
  TYPE,
  UNCOMMITTED_AT,
  VALUES,
  valued,
  worldFor,
} from "akasha/change/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const SCRIPTURES_AT = `${scriptureCollection.slug}/${scriptures.slug}` as const

test("every page naming a page by a bare name under the key is answered in this one answer", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`"${SCRIPTURES_AT}"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`["collection/songs"]`)
})

test("the page type written is the one the page reached is of", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: ONE_KEY })

  expect(said.refused).toBeNull()
  const body = bodiesIn(said, world.base).get(ONE_AT) ?? ""
  expect(body).toContain(`sectionOf: "${SCRIPTURES_AT}"`)
})

test("a name already stating its page type is passed over", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: ONE_KEY })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("one page's property is answered by one edit over that property", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(2)
})

test("a name that is an id is passed over", () => {
  const held = { [ONE_AT]: sectionAt("one", SONGS.id, ["collection/songs"]) }
  const world = worldFor(held, valued({ [ONE_AT]: pageOf(SONGS.id, ["collection/songs"]) }))

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: ONE_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no `book-section` names a page by a bare name under `sectionOf`")
})

test("a name reaching no page refuses the whole change, and the refusal names that page", () => {
  const world = worldFor(BODIES, VALUES, [SONGS])

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(ONE_AT)
  expect(said.refused ?? "").toContain("carries the slug `scriptures`")
})

test("a name reaching more than one page refuses the whole change", () => {
  const world = worldFor(BODIES, VALUES, [...PAGES, TWICE])

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("narrows to 2 pages")
})

test("a key the page type declares nowhere is refused", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: "heldBy" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `book-section` has no property under `heldBy`")
})

test("a key declaring no page type to reach is refused", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: TEXT_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`definition` on a `book-section` declares no page type to reach")
})

test("a page type the index does not name is refused", () => {
  const world = worldFor(BODIES, VALUES, PAGES, null)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`book-section` names no page type")
})

test("a count handed in holds how many pages one run writes", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY, atMost: 1 })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("a page type no page of which names a page by a bare name is refused", () => {
  const held = { [ONE_AT]: sectionAt("one", "collection/songs", ["collection/songs"]) }
  const values = valued({ [ONE_AT]: pageOf("collection/songs", ["collection/songs"]) })

  const said = qualifyRelationOnEveryPage(worldFor(held, values), {
    pageType: TYPE,
    key: LIST_KEY,
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(NOTHING_BARE)
})

test("a field named inside a record property is written anew the same way", () => {
  const world = worldFor(HOLDING_BODIES, HOLDING_VALUES)

  const said = qualifyRelationOnEveryPage(world, {
    pageType: TYPE,
    key: RECORD_KEY,
    field: FIELD_KEY,
  })

  expect(said.refused).toBeNull()
  const body = bodiesIn(said, world.base).get(HOLDING_AT) ?? ""
  expect(body).toContain(`{ collection: "${SCRIPTURES_AT}" }`)
  expect(body).toContain(`{ collection: "collection/songs" }`)
})

test("what a field declares is read off the record property that field sits in", () => {
  const world = worldFor(HOLDING_BODIES, HOLDING_VALUES)

  const said = qualifyRelationOnEveryPage(world, {
    pageType: TYPE,
    key: RECORD_KEY,
    field: "heldBy",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `holds` entry has no field under `heldBy`")
})

test("a record property no entry of which names a page by a bare name is refused", () => {
  const held = { [HOLDING_AT]: holdingAt("holding", ["collection/songs"]) }
  const values = valued({ [HOLDING_AT]: holdingOf(["collection/songs"]) })

  const said = qualifyRelationOnEveryPage(worldFor(held, values), {
    pageType: TYPE,
    key: RECORD_KEY,
    field: FIELD_KEY,
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no `book-section` names a page by a bare name under `collection`")
})

test("a page the world holds no body for is refused by its path", () => {
  const world = worldFor({}, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`alan/book/one.book-section.ts` could not be read")
})

test("which values a key holding its entries beside the page carries is read from that file", () => {
  const world = besideWorld({ [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "songs" }]) })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ROWS_AT) ?? "").toBe('{"collection":"collection/songs"}\n')
})

test("a key whose values sit in a file beside the page is written in that file alone", () => {
  const world = besideWorld({ [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "scriptures" }]) })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ROWS_AT])
  expect(bodiesIn(said, world.base).get(ROWS_AT) ?? "").toBe(`{"collection":"${SCRIPTURES_AT}"}\n`)
})

test("every part of that file is written", () => {
  const world = besideWorld({
    [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "scriptures" }]),
    [PART_TWO_AT]: rowsOf([{ [ROW_FIELD]: "songs" }]),
  })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ROWS_AT) ?? "").toContain(SCRIPTURES_AT)
  expect(bodies.get(PART_TWO_AT) ?? "").toContain("collection/songs")
})

test("one page's property is answered by one edit over each file its values sit in", () => {
  const world = besideWorld({
    [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "scriptures" }]),
    [PART_TWO_AT]: rowsOf([{ [ROW_FIELD]: "songs" }]),
  })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([ROWS_AT, PART_TWO_AT])
})

test("a row whose field holds no text is passed over", () => {
  const world = besideWorld({ [ROWS_AT]: rowsOf([{ id: "a" }, { [ROW_FIELD]: "scriptures" }]) })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ROWS_AT) ?? "").toBe(
    `{"id":"a"}\n{"collection":"${SCRIPTURES_AT}"}\n`
  )
})

test("a key of the same name inside a value a row states is left as it is", () => {
  const nested = { [ROW_FIELD]: { [ROW_FIELD]: "scriptures" } }
  const world = besideWorld({ [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "scriptures" }, nested]) })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.refused).toBeNull()
  const body = bodiesIn(said, world.base).get(ROWS_AT) ?? ""
  expect(body).toContain(`{"collection":"${SCRIPTURES_AT}"}`)
  expect(body).toContain('{"collection":{"collection":"scriptures"}}')
})

test("a row's keys are left as they are", () => {
  const world = besideWorld({ [ROWS_AT]: rowsOf([{ id: "a", [ROW_FIELD]: "scriptures" }]) })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ROWS_AT) ?? "").toBe(
    `{"id":"a","collection":"${SCRIPTURES_AT}"}\n`
  )
})

test("a field holding many names has each bare name written anew", () => {
  const world = besideWorld({ [ROWS_AT]: rowsOf([{ [ROW_FIELD]: ["scriptures", "songs"] }]) })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ROWS_AT) ?? "").toBe(
    `{"collection":["${SCRIPTURES_AT}","collection/songs"]}\n`
  )
})

test("a count handed in holds how many pages one run writes rather than how many files", () => {
  const files = {
    [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "scriptures" }]),
    [PART_TWO_AT]: rowsOf([{ [ROW_FIELD]: "songs" }]),
    [MORE_ROWS_AT]: rowsOf([{ [ROW_FIELD]: "scriptures" }]),
  }
  const world = besideWorld(files, TWO_ENTRY_VALUES)

  const said = qualifyRelationOnEveryPage(world, { ...BESIDE_ASKED, atMost: 1 })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ROWS_AT, PART_TWO_AT])
})

test("a field the entry shape declares nowhere is refused", () => {
  const world = besideWorld({ [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "scriptures" }]) })

  const said = qualifyRelationOnEveryPage(world, { ...BESIDE_ASKED, field: "heldBy" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `conditions` entry has no field under `heldBy`")
})

test("an entry file the world holds no body for is refused by its path", () => {
  const world = besideWorld({})

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${ROWS_AT}\` could not be read`)
})

test("an entry file a key states as uncommitted is refused by its uncommitted path", () => {
  const world = besideWorld({}, ENTRY_VALUES, PAGES, BESIDE_UNCOMMITTED)

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${UNCOMMITTED_AT}\` could not be read`)
})

test("an entry file holding no JSON refuses the whole change", () => {
  const world = besideWorld({ [ROWS_AT]: "what the page carries\n" })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(`'${ROWS_AT}' holds no JSON on line 1`)
})

test("a page type no row of which names a page by a bare name is refused", () => {
  const world = besideWorld({ [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "collection/songs" }]) })

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no `book-section` names a page by a bare name under `collection`")
})

test("a row naming a page that is nowhere refuses the whole change, naming the entry file", () => {
  const files = { [ROWS_AT]: rowsOf([{ [ROW_FIELD]: "scriptures" }]) }
  const world = besideWorld(files, ENTRY_VALUES, [SONGS])

  const said = qualifyRelationOnEveryPage(world, BESIDE_ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(ROWS_AT)
  expect(said.refused ?? "").toContain("carries the slug `scriptures`")
})
