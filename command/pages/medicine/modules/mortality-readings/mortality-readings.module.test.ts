import { expect, test } from "bun:test"
import {
  conditionsIn,
  type Held,
  LEVERS,
  meatPerDayIn,
  onStimulantIn,
  parkinsonsIn,
  readingsFor,
} from "akasha/command/pages/medicine/modules/mortality-readings/mortality-readings.module.code.ts"

const HELD: Held = {
  age: 40.5,
  steps: 10_000,
  sleepHours: 8.5,
  meatPerDay: 1,
  shareBelowThree: 0.5,
  shareBelowZero: 0,
  onStimulant: true,
  conditions: new Map([["ADHD", "self"]]),
  parkinsonsFirstDegree: true,
}

const PERSON = {
  medications: [{ name: "Vyvanse (lisdexamfetamine)" }],
  healthConditions: [{ condition: "ADHD", diagnosedBy: "self" }],
  familyHistory: [
    { relative: "paternal-grandmother", condition: "Parkinson's disease" },
    { relative: "father", condition: "Parkinson's disease" },
  ],
  meatServingsPerWeek: 7,
}

test("a person's stimulant, conditions, family history and meat are read off the person page", () => {
  expect(onStimulantIn(PERSON)).toBe(true)
  expect(conditionsIn(PERSON).get("ADHD")).toBe("self")
  expect(parkinsonsIn(PERSON)).toBe(true)
  expect(meatPerDayIn(PERSON)).toBe(1)
})

test("a grandparent alone is no first-degree relative", () => {
  expect(parkinsonsIn({ familyHistory: [PERSON.familyHistory[0]] })).toBe(false)
})

test("steps past the source's line count as its top", () => {
  const [steps] = readingsFor(40).get("heart-disease") ?? []
  expect(steps?.dose(HELD, 41)).toBeCloseTo(0.4)
})

test("years of stimulant use stop counting at the cap", () => {
  const years = (readingsFor(40).get("stroke") ?? [])[3]
  expect(years?.dose(HELD, 45)).toBe(5)
  expect(years?.dose(HELD, 70)).toBe(10)
})

test("an action changes only what it names", () => {
  const meat = LEVERS.find((one) => one.named.includes("meat"))
  expect(meat?.to(HELD)).toEqual({ ...HELD, meatPerDay: 0 })
})
