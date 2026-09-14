import { expect, test } from "bun:test"
import { qualifyRelationOnEveryPage } from "akasha/changes/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.code.ts"
import {
  BODIES,
  LIST_KEY,
  NOTHING_BARE,
  ONE_AT,
  ONE_KEY,
  PAGES,
  pageOf,
  SONGS,
  sectionAt,
  TEXT_KEY,
  TWICE,
  TWO_AT,
  TYPE,
  VALUES,
  valued,
  worldFor,
} from "akasha/changes/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { bodiesIn } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

test("every page naming a page by a bare name under the key is answered in this one answer", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`"scripture-collection/scriptures"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`["collection/songs"]`)
})

test("the page type written is the one the page reached is of", () => {
  const world = worldFor(BODIES, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: ONE_KEY })

  expect(said.refused).toBeNull()
  const body = bodiesIn(said, world.base).get(ONE_AT) ?? ""
  expect(body).toContain(`sectionOf: "scripture-collection/scriptures"`)
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

test("a page the world holds no body for is refused by its path", () => {
  const world = worldFor({}, VALUES)

  const said = qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`alan/books/one.book-section.ts` could not be read")
})
