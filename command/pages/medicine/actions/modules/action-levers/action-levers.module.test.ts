import { expect, test } from "bun:test"
import {
  jointly,
  LEVERS,
  waitsOf,
} from "akasha/command/pages/medicine/actions/modules/action-levers/action-levers.module.code.ts"
import type { Held } from "akasha/command/pages/medicine/modules/mortality-readings/mortality-readings.module.code.ts"
import {
  levelsOf,
  routinesOf,
} from "akasha/command/pages/medicine/modules/mortality-routines/mortality-routines.module.code.ts"

const HELD: Held = {
  age: 40.5,
  steps: 10_000,
  sleepHours: 8.5,
  meatPerDay: 1,
  shareBelowThree: 0.5,
  shareBelowZero: 0.1,
  onStimulant: true,
  stimulantYears: 1,
  conditions: new Map([["ADHD", "self"]]),
  parkinsonsFirstDegree: true,
  neverSmoked: true,
  neverDrank: true,
  bmi: 26.1,
  colorectalScreening: "none",
  routines: routinesOf(levelsOf({ nutsGramsPerDay: 0 }, 4)),
}

function named(part: string) {
  const lever = LEVERS.find((one) => one.named.includes(part))
  if (lever === undefined) throw new Error(`no lever naming ${part}`)
  return lever
}

test("an action changes only what it names", () => {
  expect(named("meat").to(HELD)).toEqual({ ...HELD, meatPerDay: 0 })
})

test("holding the safety level at 3 or above takes away the time below 3 and below 0", () => {
  expect(named("safety level").to(HELD)).toEqual({
    ...HELD,
    shareBelowThree: 0,
    shareBelowZero: 0,
  })
})

test("only long sleep is marked as confounded", () => {
  const confounded = LEVERS.filter((one) => one.evidence === "confounded").map((one) => one.named)
  expect(confounded).toEqual(["sleep down to 7 hours"])
})

test("an action on an unanswered routine waits on the property it needs", () => {
  expect(waitsOf(named("coffee"), HELD)).toBe("coffee-cups-per-day")
  expect(waitsOf(named("nuts"), HELD)).toBeNull()
  expect(waitsOf(named("meat"), HELD)).toBeNull()
})

test("actions taken together apply each in turn", () => {
  const both = jointly([named("meat"), named("nuts")])(HELD)
  expect(both.meatPerDay).toBe(0)
  expect(both.routines.at.nutsGrams).toBe(28)
})
