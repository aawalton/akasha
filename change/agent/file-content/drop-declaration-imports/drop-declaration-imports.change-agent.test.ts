import { expect, test } from "bun:test"
import { runChange } from "akasha/change/agent/file-content/drop-declaration-imports/drop-declaration-imports.change-agent.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  bodyAnswered,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const FAR_PAGE = "temper/held/globals/globals.type-declaration.ts"

const FAR = "temper/held/globals/globals.type-declaration.d.ts"

const DECLARES = "declare const HELD_ONE: number\n"

const ONE = "temper/held/one/one.module.code.tsx"

const NAMED = `import "akasha/${FAR}"`

function worldHolding(held: Readonly<Record<string, string>>): World {
  return {
    ...worldOf(held),
    index: { carryingOf: () => ({ carrying: [{ path: FAR_PAGE }] }) } as never,
  }
}

const LISTED = `${ONE} akasha/${FAR}\n`

test("an import no name the file spells reaches is dropped", () => {
  const body = `import { useState } from "react"\n${NAMED}\n\nexport const one = <path d="M1" />\n`
  const world = worldHolding({ [FAR]: "declare const d: number\n", [ONE]: body })

  expect(bodyAnswered(runChange(world, { imports: LISTED }), world, ONE)).toBe(
    `import { useState } from "react"\n\nexport const one = <path d="M1" />\n`
  )
})

test("a file whose only import is dropped opens on its first statement", () => {
  const world = worldHolding({ [FAR]: DECLARES, [ONE]: `${NAMED}\n\nexport const one = 1\n` })

  expect(bodyAnswered(runChange(world, { imports: LISTED }), world, ONE)).toBe(
    "export const one = 1\n"
  )
})

test("an import a name the file spells still reaches is refused", () => {
  const world = worldHolding({
    [FAR]: DECLARES,
    [ONE]: `${NAMED}\n\nexport const one = HELD_ONE\n`,
  })

  expect(runChange(world, { imports: LISTED }).refused ?? "").toMatch(/so that import stays/)
})

test("an import the file does not carry is refused", () => {
  const world = worldHolding({ [FAR]: DECLARES, [ONE]: "export const one = 1\n" })

  expect(runChange(world, { imports: LISTED }).refused ?? "").toMatch(/carries no/)
})

test("a line that is no path and specifier is refused", () => {
  const world = worldHolding({ [FAR]: DECLARES })

  expect(runChange(world, { imports: "one" }).refused ?? "").toMatch(/parted by one space/)
})

test("an argument this change does not take is refused by the key", () => {
  expect(runChange(worldHolding({}), { at: "one" }).refused ?? "").toMatch(/`at` is no argument/)
})
