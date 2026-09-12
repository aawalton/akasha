import { expect, test } from "bun:test"
import {
  runChange,
  sortPropertyValuesOnEveryPage,
} from "akasha/changes/agent/page-type/sort-property-values-on-every-page/sort-property-values-on-every-page.change-agent.code.ts"
import { runChange as sorting } from "akasha/changes/mechanical/page-type/move/sort-property-values-on-every-page/sort-property-values-on-every-page.change-mechanical-page-type.code.ts"
import {
  BODIES,
  DECLARED,
  type Files,
  KEY,
  ONE_AT,
  OUT_OF_ORDER,
  SORTING,
  sectionAt,
  worldFor as sectionsWorld,
  TWO_AT,
  VALUES,
  valued,
} from "akasha/changes/mechanical/page-type/move/sort-property-values-on-every-page/sort-property-values-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import type { Carried as Declared } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const REACHES: Reaching = (world, at, given) => {
  if (at === SORTING) return Promise.resolve(sorting(world, given as Parameters<typeof sorting>[1]))
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldFor(
  bodies: Files,
  values: ReadonlyMap<string, Value>,
  carried: readonly Declared[] | null = [DECLARED]
): World {
  return sectionsWorld(bodies, values, REACHES, carried)
}

test("every page holding the key out of order has those values put in order", async () => {
  const world = worldFor(BODIES, VALUES)

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`"alpha", "beta"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`"alpha", "beta"`)
})

test("a page whose values are already in order is passed over", async () => {
  const held = { ...BODIES, [TWO_AT]: sectionAt("two", ["alpha", "beta"]) }
  const world = worldFor(held, valued({ [ONE_AT]: OUT_OF_ORDER, [TWO_AT]: ["alpha", "beta"] }))

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("putting the values in order is left to the change reached at its address", async () => {
  const reached: string[] = []
  const world = sectionsWorld(BODIES, VALUES, (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(reached).toEqual([SORTING])
})

test("a key holding no list is passed over rather than refused", async () => {
  const world = worldFor(BODIES, new Map([[ONE_AT, { [KEY]: "alpha" } as Value]]))

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no `book-section` holds `partOfSlugs` out of the order it sorts in")
})

test("a page type the index does not name is refused", async () => {
  const world = worldFor(BODIES, VALUES, null)

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`book-section` names no page type")
})

test("a count handed in holds how many pages one run carries values on", async () => {
  const world = worldFor(BODIES, VALUES)

  const said = await sortPropertyValuesOnEveryPage(world, {
    pageType: "book-section",
    key: KEY,
    atMost: 1,
  })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const world = worldFor({ ...BODIES, [TWO_AT]: "const two = 1\n" }, VALUES)

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldFor(BODIES, VALUES), { key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
