import { expect, test } from "bun:test"
import {
  conditionsIn,
  type Held,
  habitsIn,
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
  neverSmoked: true,
  neverDrank: true,
  bmi: 26.1,
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
  const [steps] = readingsFor().get("heart-disease") ?? []
  expect(steps?.dose(HELD, 41)).toBeCloseTo(0.4)
})

test("BMI is read against the people's mean, past the source's change point", () => {
  const bmi = (readingsFor().get("stroke") ?? [])[5]
  expect(bmi?.dose(HELD, 41)).toBeCloseTo((1.1 - 4.4) / 5)
  expect(bmi?.dose({ ...HELD, bmi: null }, 41)).toBe(0)
})

test("bodyweight and height give BMI, and no tobacco or alcohol reads as never", () => {
  const habits = habitsIn({
    bodyweight: 182,
    height: 70,
    tobaccoUse: "never",
    alcoholDrinksPerWeek: 0,
  })
  expect(habits.bmi).toBeCloseTo(26.11, 2)
  expect(habits.neverSmoked).toBe(true)
  expect(habits.neverDrank).toBe(true)
  expect(habitsIn({}).bmi).toBeNull()
})

test("an action changes only what it names", () => {
  const meat = LEVERS.find((one) => one.named.includes("meat"))
  expect(meat?.to(HELD)).toEqual({ ...HELD, meatPerDay: 0 })
})
