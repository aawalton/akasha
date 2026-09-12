import { expect, test } from "bun:test"
import {
  carriedIn,
  runChange,
  sortPropertyValuesOnEveryPage,
} from "akasha/changes/mechanical/page-type/move/sort-property-values-on-every-page/sort-property-values-on-every-page.change-mechanical-page-type.code.ts"
import {
  BODIES,
  KEY,
  MANY,
  NOTHING_ORDERED,
  ONE_AT,
  SPELLED,
  sectionAt,
  TWO_AT,
  TYPE,
  VALUES,
  valued,
  worldFor,
} from "akasha/changes/mechanical/page-type/move/sort-property-values-on-every-page/sort-property-values-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { bodiesIn, type Reaching } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const REACHED: string[] = []

const REACHES: Reaching = (_world, at) => {
  REACHED.push(at)
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

test("every page holding the key out of order is answered in this one answer", () => {
  const world = worldFor(BODIES, VALUES, REACHES)

  const said = runChange(world, { pageType: TYPE, key: KEY })

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(2)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`"alpha", "beta"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`"alpha", "beta"`)
})

test("one page's property is answered by one edit over that property", () => {
  const held = { [ONE_AT]: sectionAt("one", MANY) }
  const world = worldFor(held, valued({ [ONE_AT]: MANY }), REACHES)

  const said = sortPropertyValuesOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.edits).toHaveLength(1)
})

test("the values of a page carried come out in the order they sort in", () => {
  const held = { [ONE_AT]: sectionAt("one", MANY) }
  const world = worldFor(held, valued({ [ONE_AT]: MANY }), REACHES)

  const said = sortPropertyValuesOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `["alpha", "bravo", "charlie", "delta"]`
  )
})

test("a page is carried when a value it holds sits outside the longest run already in order", () => {
  expect(carriedIn(["alpha", "delta", "beta", "echo"])).toEqual(["delta"])
})

test("a list already in order carries nothing", () => {
  expect(carriedIn(["alpha", "beta"])).toEqual([])
})

test("the spelling a value already has is the spelling that value keeps", () => {
  const world = worldFor({ [ONE_AT]: SPELLED }, valued({ [ONE_AT]: ["beta", "alpha"] }), REACHES)

  const said = sortPropertyValuesOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(`["al\\u0070ha", "beta"]`)
})

test("a key holding no list is passed over rather than refused here", () => {
  const world = worldFor(BODIES, new Map([[ONE_AT, { [KEY]: "alpha" } as Value]]), REACHES)

  const said = sortPropertyValuesOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(NOTHING_ORDERED)
})

test("a page type the index does not name is refused here", () => {
  const world = worldFor(BODIES, VALUES, REACHES, null)

  const said = sortPropertyValuesOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`book-section` names no page type")
})

test("a count handed in bounds how many pages one answer carries values on", () => {
  const world = worldFor(BODIES, VALUES, REACHES)

  const said = sortPropertyValuesOnEveryPage(world, { pageType: TYPE, key: KEY, atMost: 1 })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([ONE_AT])
})

test("a page stating no list under the key is refused by its path", () => {
  const world = worldFor({ ...BODIES, [TWO_AT]: "const two = 1\n" }, VALUES, REACHES)

  const said = sortPropertyValuesOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`alan/books/two.book-section.ts` states no list under `partOfSlugs`")
})

test("no rung beneath is reached", () => {
  REACHED.length = 0
  const world = worldFor(BODIES, VALUES, REACHES)

  const said = sortPropertyValuesOnEveryPage(world, { pageType: TYPE, key: KEY })

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
