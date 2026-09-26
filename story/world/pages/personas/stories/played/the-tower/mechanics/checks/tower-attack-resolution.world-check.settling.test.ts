import { expect, test } from "bun:test"
import {
  type Resolved,
  settled,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/checks/tower-attack-resolution.world-check.settling.code.ts"

const STRUCK = {
  attackPower: 45,
  defence: 14,
  baseDamage: 1,
  gate: 1,
  intent: 0,
  bonuses: [],
}

const NINE = { total: 9, crit: false, fumble: false }

function answeredOf(reading: unknown, roll = NINE): Resolved {
  const said = settled(reading, roll)
  if ("refused" in said) throw new Error(said.refused)
  return said.answered
}

test("a strike of one damage against a defence of fourteen resolves as the tower recorded it", () => {
  expect(answeredOf(STRUCK)).toEqual({
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
  const reading = {
    attackPower: 45,
    defence: 16,
    baseDamage: 20,
    gate: 1.5,
    intent: 10,
    bonuses: [{ from: "Ember Burst", by: 1 }],
  }
  expect(answeredOf(reading, { total: 8, crit: false, fumble: false })).toEqual({
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
  const reading = { attackPower: 33.5, defence: 11, baseDamage: 14, gate: 0.3, intent: 3 }
  const ran = answeredOf(reading, { total: 2, crit: false, fumble: false })
  expect(ran.margin).toBe(27.5)
  expect(ran.damage).toBe(14)
})

test("a strike on a read weakness resolves as the tower recorded it", () => {
  const reading = { attackPower: 22, defence: 11, baseDamage: 16, gate: 0.6, intent: 7 }
  const ran = answeredOf(reading, { total: 15, crit: false, fumble: false })
  expect(ran.margin).toBe(33)
  expect(ran.damage).toBe(36)
})

test("the gate decides what the same strike is worth", () => {
  expect(answeredOf({ ...STRUCK, baseDamage: 20 }).damage).toBe(87)
  expect(answeredOf({ ...STRUCK, baseDamage: 20, gate: 3 }).damage).toBe(260)
  expect(answeredOf({ ...STRUCK, baseDamage: 20, gate: 0.25 }).damage).toBe(22)
})

test("a bonus counts into the score the strike is judged by", () => {
  const ran = answeredOf({ ...STRUCK, bonuses: [{ from: "the wind that cuts", by: 6 }] })
  expect(ran.effectiveScore).toBe(60)
  expect(ran.margin).toBe(46)
})

test("a fumble misses whatever the margin is", () => {
  const ran = answeredOf(STRUCK, { total: 9, crit: false, fumble: true })
  expect(ran).toMatchObject({ hit: false, band: "fumble", damage: 0 })
})

test("a critical strike counts a margin of at least six", () => {
  const ran = answeredOf({ ...STRUCK, attackPower: 5 }, { total: 9, crit: true, fumble: false })
  expect(ran.margin).toBe(0)
  expect(ran).toMatchObject({ hit: true, band: "crit", damage: 2 })
})

test("a strike short of the defence by less than three grazes for a quarter", () => {
  const ran = answeredOf({ ...STRUCK, attackPower: 3 })
  expect(ran.margin).toBe(-2)
  expect(ran).toMatchObject({ hit: true, band: "graze", damage: 1 })
})

test("a strike short of the defence by three misses", () => {
  const ran = answeredOf({ ...STRUCK, attackPower: 2 })
  expect(ran).toMatchObject({ hit: false, band: "miss", damage: 0 })
})

test("intent is held between none and ten", () => {
  expect(answeredOf({ ...STRUCK, intent: 40 }).intent).toBe(10)
  expect(answeredOf({ ...STRUCK, intent: -4 }).intent).toBe(0)
})

test("a reading missing what a strike reads is refused", () => {
  expect(settled({ attackPower: 45 }, NINE)).toHaveProperty("refused")
})
