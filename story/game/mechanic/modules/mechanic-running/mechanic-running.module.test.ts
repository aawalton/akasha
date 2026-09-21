import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.ts"
import {
  codeAt,
  ranAt,
} from "akasha/story/game/mechanic/modules/mechanic-running/mechanic-running.module.code.ts"
import { physAtk } from "akasha/story/game/mechanic/pages/phys-atk/phys-atk.game-mechanic.ts"

const ROOT = process.cwd()

const AT = namedAs(gameMechanic.slug, physAtk.slug, null)

const NOWHERE = namedAs(gameMechanic.slug, "nothing-is-filed-here", null)

const BESIDE = `${physAtk.slug}.${gameMechanic.slug}.code.ts`

test("an address reaches the code beside the mechanic's page", () => {
  expect(codeAt(ROOT, AT)?.endsWith(BESIDE)).toBe(true)
})

test("an address the index does not hold reaches no code", () => {
  expect(codeAt(ROOT, NOWHERE)).toBe(null)
})

test("a name that qualifies no page type reaches no code", () => {
  expect(codeAt(ROOT, physAtk.slug)).toBe(null)
})

test("the mechanic an address names is run", async () => {
  const ran = await ranAt(ROOT, AT, { held: { might: 4, finesse: 2, "weapon.atk": 3 } })
  expect(ran).toEqual({ answered: 11 })
})

test("an address naming no mechanic is refused", async () => {
  const ran = await ranAt(ROOT, NOWHERE, {})
  expect(ran).toHaveProperty("refused")
})
