import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.ts"
import {
  codeAt,
  ranAt,
} from "akasha/story/game/game-mechanic/modules/mechanic-running/mechanic-running.module.code.ts"
import { affinityBias } from "akasha/story/game/game-mechanic/pages/affinity-bias/affinity-bias.game-mechanic.ts"
import { attackResolution } from "akasha/story/game/game-mechanic/pages/attack-resolution/attack-resolution.game-mechanic.ts"
import { physAtk } from "akasha/story/game/game-mechanic/pages/phys-atk/phys-atk.game-mechanic.ts"

const ROOT = process.cwd()

const AT = namedAs(gameMechanic.slug, physAtk.slug, null)

const STRUCK = namedAs(gameMechanic.slug, attackResolution.slug, null)

const BIASED = namedAs(gameMechanic.slug, affinityBias.slug, null)

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

test("a mechanic answering a bare value is read as having answered that value", async () => {
  const ran = await ranAt(ROOT, STRUCK, {
    attackPower: 20,
    defense: 15,
    baseDamage: 6,
    gate: 1,
    intent: 0,
    bonuses: [],
    roll: { total: 7, crit: false, fumble: false },
  })
  expect(ran).toEqual({ answered: expect.objectContaining({ hit: true, band: "hit" }) })
})

test("a mechanic answering a refusal is read as having refused", async () => {
  const ran = await ranAt(ROOT, BIASED, { tier: "no-such-tier", matched: true })
  expect(ran).toHaveProperty("refused")
})
