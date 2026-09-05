import { expect, test } from "bun:test"
import { sleepIn } from "./upkeep-sleep.readout.code.ts"

const held = (sleep: unknown) => ({ "sleep-hours": sleep })

test("a sleep given as text is read as the number it spells", () => {
  expect(sleepIn(held("7.5"))).toBe(7.5)
  expect(sleepIn(held("6.383333333333334"))).toBe(6.383333333333334)
  expect(sleepIn(held(8))).toBe(8)
})

test("a sleep of zero is a reading rather than an absent one", () => {
  expect(sleepIn(held("0"))).toBe(0)
  expect(sleepIn(held(0))).toBe(0)
})

test("a day holding no sleep stretch is no reading rather than a sleep of zero", () => {
  expect(sleepIn(held(undefined))).toBeNull()
  expect(sleepIn({})).toBeNull()
  expect(sleepIn(held(""))).toBeNull()
  expect(sleepIn(held("   "))).toBeNull()
  expect(sleepIn(held("soon"))).toBeNull()
  expect(sleepIn(held(null))).toBeNull()
})
