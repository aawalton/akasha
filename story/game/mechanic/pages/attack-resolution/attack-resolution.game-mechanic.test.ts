import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/mechanic/pages/attack-resolution/attack-resolution.game-mechanic.code.ts"

const STRUCK = {
  attackPower: 45,
  defense: 14,
  baseDamage: 1,
  intent: 0,
  bonuses: [],
  roll: { total: 9, crit: false, fumble: false },
}

test("the strike the tower recorded resolves as the tower recorded it", () => {
  expect(runMechanic(STRUCK)).toEqual({
    hit: true,
    band: "hit",
    gate: 1,
    intent: 0,
    margin: 40,
    effectiveScore: 54,
    damage: 4,
  })
})

test("a bonus counts into the score the strike is judged by", () => {
  const ran = runMechanic({ ...STRUCK, bonuses: [{ from: "the wind that cuts", by: 6 }] })
  expect(ran.effectiveScore).toBe(60)
  expect(ran.margin).toBe(46)
})

test("a fumble misses whatever the margin is", () => {
  const ran = runMechanic({ ...STRUCK, roll: { total: 9, crit: false, fumble: true } })
  expect(ran).toMatchObject({ hit: false, band: "fumble", damage: 0 })
})

test("a critical strike counts a margin of at least six", () => {
  const ran = runMechanic({
    ...STRUCK,
    attackPower: 5,
    roll: { total: 9, crit: true, fumble: false },
  })
  expect(ran.margin).toBe(0)
  expect(ran).toMatchObject({ hit: true, band: "crit", damage: 2 })
})

test("a strike short of the defence by less than three grazes for a quarter", () => {
  const ran = runMechanic({ ...STRUCK, attackPower: 3 })
  expect(ran.margin).toBe(-2)
  expect(ran).toMatchObject({ hit: true, band: "graze", damage: 1 })
})

test("a strike short of the defence by three misses", () => {
  const ran = runMechanic({ ...STRUCK, attackPower: 2 })
  expect(ran).toMatchObject({ hit: false, band: "miss", damage: 0 })
})

test("intent is held between none and ten", () => {
  expect(runMechanic({ ...STRUCK, intent: 40 }).intent).toBe(10)
  expect(runMechanic({ ...STRUCK, intent: -4 }).intent).toBe(0)
})
