import { expect, test } from "bun:test"
import { heldNothing, surplusIn } from "./upkeep-surplus.readout.code.ts"

const held = (surplus: unknown, sleep: unknown = "8", spend: unknown = "8") => ({
  "surplus-hours": surplus,
  "sleep-hours": sleep,
  "spend-hours": spend,
})

test("a surplus given as text is read as the number it spells", () => {
  expect(surplusIn(held("1.5"))).toBe(1.5)
  expect(surplusIn(held("-3.25"))).toBe(-3.25)
  expect(surplusIn(held(-2))).toBe(-2)
})

test("a surplus of zero is a reading rather than an absent one", () => {
  expect(surplusIn(held("0"))).toBe(0)
  expect(surplusIn(held(0, "0", "0"))).toBe(0)
})

test("a day carrying no surplus is no reading rather than a surplus of zero", () => {
  expect(surplusIn(held(undefined))).toBeNull()
  expect(surplusIn(held(""))).toBeNull()
  expect(surplusIn(held("   "))).toBeNull()
  expect(surplusIn(held("soon"))).toBeNull()
  expect(surplusIn(held(null))).toBeNull()
})

test("a day holding neither sleep nor spend has held nothing to subtract", () => {
  expect(heldNothing({ "surplus-hours": "0" })).toBe(true)
  expect(heldNothing({ "surplus-hours": "0", "sleep-hours": null, "spend-hours": null })).toBe(true)
  expect(heldNothing({ "sleep-hours": "8" })).toBe(false)
  expect(heldNothing({ "spend-hours": "0" })).toBe(false)
})

test("the zero two absent halves subtract to is no reading rather than a surplus of zero", () => {
  expect(surplusIn({ "surplus-hours": "0", "sleep-hours": null, "spend-hours": null })).toBeNull()
  expect(surplusIn({ "surplus-hours": 0 })).toBeNull()
})

test("a day that spent everything it slept is a reading of zero rather than nothing", () => {
  expect(surplusIn({ "surplus-hours": "0", "sleep-hours": "8", "spend-hours": "8" })).toBe(0)
})

test("a row spelled as the day page spells it is no reading rather than the surplus it holds", () => {
  expect(surplusIn({ surplusHours: -5.5, sleepHours: 7.5, spendHours: 13 })).toBeNull()
  expect(surplusIn({ "surplus-hours": -5.5, "sleep-hours": 7.5, "spend-hours": 13 })).toBe(-5.5)
})
