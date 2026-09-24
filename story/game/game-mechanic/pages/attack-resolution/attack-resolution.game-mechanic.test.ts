import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/game-mechanic/pages/attack-resolution/attack-resolution.game-mechanic.code.ts"

const STRUCK = {
  attackPower: 45,
  defense: 14,
  baseDamage: 1,
  gate: 1,
  intent: 0,
  bonuses: [],
  roll: { total: 9, crit: false, fumble: false },
}

test("a strike of one damage against a defence of fourteen resolves as the tower recorded it", () => {
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

test("the strike that ended the tower's fifth floor resolves as the tower recorded it", () => {
  expect(
    runMechanic({
      attackPower: 45,
      defense: 16,
      baseDamage: 20,
      gate: 1.5,
      intent: 10,
      bonuses: [{ from: "Ember Burst", by: 1 }],
      roll: { total: 8, crit: false, fumble: false },
    })
  ).toEqual({
    hit: true,
    band: "hit",
    gate: 1.5,
    intent: 10,
    margin: 48,
    effectiveScore: 64,
    damage: 150,
  })
})

test("a strike into the gate a wrong read leaves resolves as the tower recorded it", () => {
  const ran = runMechanic({
    attackPower: 33.5,
    defense: 11,
    baseDamage: 14,
    gate: 0.3,
    intent: 3,
    bonuses: [],
    roll: { total: 2, crit: false, fumble: false },
  })
  expect(ran.margin).toBe(27.5)
  expect(ran.damage).toBe(14)
})

test("a strike on a read weakness resolves as the tower recorded it", () => {
  const ran = runMechanic({
    attackPower: 22,
    defense: 11,
    baseDamage: 16,
    gate: 0.6,
    intent: 7,
    bonuses: [],
    roll: { total: 15, crit: false, fumble: false },
  })
  expect(ran.margin).toBe(33)
  expect(ran.damage).toBe(36)
})

test("the gate decides what the same strike is worth", () => {
  expect(runMechanic({ ...STRUCK, baseDamage: 20 }).damage).toBe(87)
  expect(runMechanic({ ...STRUCK, baseDamage: 20, gate: 3 }).damage).toBe(260)
  expect(runMechanic({ ...STRUCK, baseDamage: 20, gate: 0.25 }).damage).toBe(22)
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
