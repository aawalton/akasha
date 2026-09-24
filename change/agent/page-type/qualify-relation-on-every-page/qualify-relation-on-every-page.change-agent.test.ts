import { expect, test } from "bun:test"
import {
  qualifyRelationOnEveryPage,
  runChange,
} from "akasha/change/agent/page-type/qualify-relation-on-every-page/qualify-relation-on-every-page.change-agent.code.ts"
import {
  BODIES,
  DECLARED,
  type Files,
  LIST_KEY,
  NOTHING_BARE,
  ONE_AT,
  ONE_KEY,
  PAGES,
  pageOf,
  QUALIFYING,
  type Reached,
  sectionAt,
  worldFor as sectionsWorld,
  TWO_AT,
  TYPE,
  VALUES,
  valued,
} from "akasha/change/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.test-fixtures.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

function worldFor(
  bodies: Files,
  values: ReadonlyMap<string, Value>,
  pages: readonly Reached[] = PAGES,
  carried: readonly Declared[] | null = DECLARED
): World {
  return sectionsWorld(bodies, values, pages, carried, running)
}

test("every page naming a page by a bare name has that name written anew", async () => {
  const world = worldFor(BODIES, VALUES)

  const said = await qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`"scripture-collection/scriptures"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`["collection/songs"]`)
})

test("a page naming its page type under the key already is passed over", async () => {
  const world = worldFor(BODIES, VALUES)

  const said = await qualifyRelationOnEveryPage(world, { pageType: TYPE, key: ONE_KEY })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("writing the names anew is left to the change reached at its address", async () => {
  const reached: string[] = []
  const world = sectionsWorld(BODIES, VALUES, PAGES, DECLARED, (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(reached).toEqual([QUALIFYING])
})

test("a page type no page of which names a page by a bare name is answered as no edit", async () => {
  const held = { [ONE_AT]: sectionAt("one", "collection/songs", ["collection/songs"]) }
  const values = valued({ [ONE_AT]: pageOf("collection/songs", ["collection/songs"]) })

  const said = await qualifyRelationOnEveryPage(worldFor(held, values), {
    pageType: TYPE,
    key: LIST_KEY,
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBeNull()
  expect(said.told).toEqual([NOTHING_BARE])
})

test("a page type the index does not name is refused", async () => {
  const world = worldFor(BODIES, VALUES, PAGES, null)

  const said = await qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`book-section` names no page type")
})

test("a count handed in holds how many pages one run writes", async () => {
  const world = worldFor(BODIES, VALUES)

  const said = await qualifyRelationOnEveryPage(world, {
    pageType: TYPE,
    key: LIST_KEY,
    atMost: 1,
  })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const world = worldFor({ ...BODIES, [TWO_AT]: "const two = 1\n" }, VALUES)

  const said = await qualifyRelationOnEveryPage(world, { pageType: TYPE, key: LIST_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldFor(BODIES, VALUES), { key: LIST_KEY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
