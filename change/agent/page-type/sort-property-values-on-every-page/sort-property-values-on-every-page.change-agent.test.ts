import { expect, test } from "bun:test"
import {
  runChange,
  sortPropertyValuesOnEveryPage,
} from "akasha/change/agent/page-type/sort-property-values-on-every-page/sort-property-values-on-every-page.change-agent.code.ts"
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
} from "akasha/change/mechanical/page-type/move/sort-property-values-on-every-page/sort-property-values-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

function worldFor(
  bodies: Files,
  values: ReadonlyMap<string, Value>,
  carried: readonly Declared[] | null = [DECLARED]
): World {
  return sectionsWorld(bodies, values, running, carried)
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
  expect(said.refused).toBeNull()
  expect(said.told).toEqual(["no `book-section` holds `partOfSlugs` out of the order it sorts in"])
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
