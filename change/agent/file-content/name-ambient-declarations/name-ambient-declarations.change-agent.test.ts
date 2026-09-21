import { expect, test } from "bun:test"
import {
  nameAmbientDeclarations,
  runChange,
} from "akasha/change/agent/file-content/name-ambient-declarations/name-ambient-declarations.change-agent.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  bodyAnswered,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "temper/held"

const FAR_PAGE = "temper/held/globals/globals.type-declaration.ts"

const FAR = "temper/held/globals/globals.type-declaration.d.ts"

const NEAR_PAGE = "temper/held/one/near/near.type-declaration.ts"

const NEAR = "temper/held/one/near/near.type-declaration.d.ts"

const DECLARES = "declare const HELD_ONE: number\ndeclare function heldTwo(): void\n"

const ONE = "temper/held/one/one.module.code.ts"

const TWO = "temper/held/two/two.module.code.ts"

const SPELLS = "export const one = HELD_ONE\n"

function worldHolding(held: Readonly<Record<string, string>>, pages: readonly string[]): World {
  return {
    ...worldOf(held),
    index: { carryingOf: () => ({ carrying: pages.map((path) => ({ path })) }) } as never,
    under: () => Object.keys(held),
  }
}

test("a name nothing in the file binds is named by an import of the declaration declaring it", () => {
  const world = worldHolding({ [FAR]: DECLARES, [ONE]: SPELLS }, [FAR_PAGE])
  const said = nameAmbientDeclarations(world, AT, 10)

  expect(bodyAnswered(said, world, ONE)).toBe(`import "akasha/${FAR}"\n\n${SPELLS}`)
})

test("a name the file reaches on globalThis is named by an import of the declaration", () => {
  const world = worldHolding(
    { [FAR]: "declare var HELD_ONE: number\n", [ONE]: "globalThis.HELD_ONE = 1\n" },
    [FAR_PAGE]
  )
  const said = nameAmbientDeclarations(world, AT, 10)

  expect(bodyAnswered(said, world, ONE)).toContain(`import "akasha/${FAR}"`)
})

test("a declaration the named declaration reaches is named by the file as well", () => {
  const world = worldHolding(
    {
      [FAR]: "declare const HELD_ONE: Held\n",
      [NEAR]: "interface Held {\n  one: number\n}\n",
      [ONE]: SPELLS,
    },
    [FAR_PAGE, NEAR_PAGE]
  )
  const said = bodyAnswered(nameAmbientDeclarations(world, AT, 10), world, ONE)

  expect(said).toContain(`import "akasha/${FAR}"`)
  expect(said).toContain(`import "akasha/${NEAR}"`)
})

test("a name the file binds itself is left alone", () => {
  const world = worldHolding({ [FAR]: DECLARES, [ONE]: `const HELD_ONE = 1\n${SPELLS}` }, [
    FAR_PAGE,
  ])

  expect(nameAmbientDeclarations(world, AT, 10).edits).toEqual([])
})

test("a file already naming that declaration has nothing added", () => {
  const world = worldHolding({ [FAR]: DECLARES, [ONE]: `import "akasha/${FAR}"\n\n${SPELLS}` }, [
    FAR_PAGE,
  ])

  expect(nameAmbientDeclarations(world, AT, 10).edits).toEqual([])
})

test("where more than one declaration declares the name, the one sharing the most folders is named", () => {
  const world = worldHolding({ [FAR]: DECLARES, [NEAR]: DECLARES, [ONE]: SPELLS }, [
    FAR_PAGE,
    NEAR_PAGE,
  ])

  expect(bodyAnswered(nameAmbientDeclarations(world, AT, 10), world, ONE)).toContain(
    `"akasha/${NEAR}"`
  )
})

test("a run names declarations in at most the count of files handed in", () => {
  const world = worldHolding({ [FAR]: DECLARES, [ONE]: SPELLS, [TWO]: SPELLS }, [FAR_PAGE])

  expect(nameAmbientDeclarations(world, AT, 1).edits).toHaveLength(1)
  expect(nameAmbientDeclarations(world, AT, 2).edits).toHaveLength(2)
})

test("a path handed in to leave alone is left as it is", () => {
  const world = worldHolding({ [FAR]: DECLARES, [ONE]: SPELLS, [TWO]: SPELLS }, [FAR_PAGE])

  expect(nameAmbientDeclarations(world, AT, 10, new Set([ONE])).edits).toHaveLength(1)
})

test("a declaration file itself is left alone", () => {
  const world = worldHolding({ [FAR]: DECLARES }, [FAR_PAGE])

  expect(nameAmbientDeclarations(world, AT, 10).edits).toEqual([])
})

test("a name no declaration declares is left alone", () => {
  const world = worldHolding({ [FAR]: DECLARES, [ONE]: "export const one = NOWHERE_AT_ALL\n" }, [
    FAR_PAGE,
  ])

  expect(nameAmbientDeclarations(world, AT, 10).edits).toEqual([])
})

test("an argument this change was handed no value for is refused by the key", () => {
  const world = worldHolding({ [FAR]: DECLARES }, [FAR_PAGE])

  expect(runChange(world, {}).refused ?? "").toMatch(/`at` names what this change is handed/)
})
