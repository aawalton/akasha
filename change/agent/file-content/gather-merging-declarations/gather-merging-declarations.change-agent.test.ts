import { expect, test } from "bun:test"
import {
  gatherMergingDeclarations,
  runChange,
} from "akasha/change/agent/file-content/gather-merging-declarations/gather-merging-declarations.change-agent.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  bodyAnswered,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const NEAR_PAGE = "temper/a/a.type-declaration.ts"

const NEAR = "temper/a/a.type-declaration.d.ts"

const FAR_PAGE = "temper/deep/b/b.type-declaration.ts"

const FAR = "temper/deep/b/b.type-declaration.d.ts"

const ONE = "interface Held {\n  one: number\n}\n"

const TWO = "interface Held {\n  two: string\n}\n"

const OTHER_ONE = "interface Other {\n  one: number\n}\n"

const OTHER_TWO = "interface Other {\n  two: string\n}\n"

const AWAY = "declare const AWAY: number\n"

function worldHolding(held: Readonly<Record<string, string>>, pages: readonly string[]): World {
  return {
    ...worldOf(held),
    index: { everyOfType: () => pages.map((path) => ({ path })) } as never,
  }
}

const PAGES = [NEAR_PAGE, FAR_PAGE]

test("an interface more than one declaration file declares is gathered into one file", () => {
  const world = worldHolding({ [NEAR]: ONE, [FAR]: `${TWO}\n${AWAY}` }, PAGES)
  const said = gatherMergingDeclarations(world, 10)

  expect(bodyAnswered(said, world, NEAR)).toBe(`${ONE}\n${TWO}`)
  expect(bodyAnswered(said, world, FAR)).toBe(AWAY)
})

test("an interface one file alone declares is left alone", () => {
  const world = worldHolding({ [NEAR]: ONE, [FAR]: AWAY }, PAGES)

  expect(gatherMergingDeclarations(world, 10).edits).toEqual([])
})

test("a run gathers at most the count of interfaces handed in", () => {
  const world = worldHolding(
    { [NEAR]: `${ONE}\n${OTHER_ONE}`, [FAR]: `${TWO}\n${OTHER_TWO}\n${AWAY}` },
    PAGES
  )
  const said = gatherMergingDeclarations(world, 1)

  expect(bodyAnswered(said, world, FAR)).toBe(`${OTHER_TWO}\n${AWAY}`)
})

test("a path handed in to leave alone holds back every interface that path declares", () => {
  const world = worldHolding({ [NEAR]: ONE, [FAR]: `${TWO}\n${AWAY}` }, PAGES)

  expect(gatherMergingDeclarations(world, 10, new Set([FAR])).edits).toEqual([])
})

test("an interface is left alone where a file it is in would be left with nothing", () => {
  const world = worldHolding({ [NEAR]: ONE, [FAR]: TWO }, PAGES)

  expect(gatherMergingDeclarations(world, 10).edits).toEqual([])
})

test("an argument this change was handed no value for is refused by the key", () => {
  const world = worldHolding({ [NEAR]: ONE }, [NEAR_PAGE])

  expect(runChange(world, {}).refused ?? "").toMatch(/`most` names what this change is handed/)
})
