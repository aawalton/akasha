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
  stimulantStartIn,
  stimulantYearsAt,
} from "akasha/command/pages/medicine/modules/mortality-readings/mortality-readings.module.code.ts"

const HELD: Held = {
  age: 40.5,
  steps: 10_000,
  sleepHours: 8.5,
  meatPerDay: 1,
  shareBelowThree: 0.5,
  shareBelowZero: 0,
  onStimulant: true,
  stimulantYears: 1,
  conditions: new Map([["ADHD", "self"]]),
  parkinsonsFirstDegree: true,
  neverSmoked: true,
  neverDrank: true,
  bmi: 26.1,
  colorectalScreening: "none",
}

test("colonoscopy counts from 45, against the share of the people already screened", () => {
  const screening = (readingsFor().get("colorectal-cancer") ?? [])[3]
  expect(screening?.factor).toBe("colonoscopy screening")
  expect(screening?.dose(HELD, 44)).toBe(0)
  expect(screening?.dose(HELD, 50)).toBeCloseTo(-0.66)
  expect(
    screening?.dose({ ...HELD, colorectalScreening: "colonoscopy-10-yearly" }, 50)
  ).toBeCloseTo(0.34)
  expect(habitsIn({}).colorectalScreening).toBe("none")
})

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

test("a stimulant's start date is the earliest any stimulant states", () => {
  expect(
    stimulantStartIn({
      medications: [
        { name: "Adderall (mixed amphetamine salts)", startedOn: "2025-12-01" },
        { name: "Vyvanse (lisdexamfetamine)", startedOn: "2025-10-28" },
        { name: "creatine monohydrate", startedOn: "2020-01-01" },
      ],
    })
  ).toBe("2025-10-28")
  expect(stimulantStartIn(PERSON)).toBeNull()
})

test("each year takes the stimulant band its years of use fall in, once and only once", () => {
  const stimulant = (readingsFor().get("heart-disease") ?? []).slice(3, 8)
  expect(stimulant.map((one) => one.factor)).toEqual([
    "ADHD medication up to 1 year, ischaemic heart disease",
    "ADHD medication 1 to 2 years, ischaemic heart disease",
    "ADHD medication 2 to 3 years, ischaemic heart disease",
    "ADHD medication 3 to 5 years, ischaemic heart disease",
    "ADHD medication over 5 years, ischaemic heart disease",
  ])
  const doses = (age: number, held: Held = HELD) => stimulant.map((one) => one.dose(held, age))
  expect(stimulantYearsAt(HELD, 40)).toBeCloseTo(1)
  expect(doses(40)).toEqual([1, 0, 0, 0, 0])
  expect(doses(41)).toEqual([0, 1, 0, 0, 0])
  expect(doses(43)).toEqual([0, 0, 0, 1, 0])
  expect(doses(50)).toEqual([0, 0, 0, 0, 1])
  expect(doses(40, { ...HELD, stimulantYears: null })).toEqual([0, 0, 0, 0, 1])
  expect(doses(50, { ...HELD, onStimulant: false })).toEqual([0, 0, 0, 0, 0])
})

test("a grandparent alone is no first-degree relative", () => {
  expect(parkinsonsIn({ familyHistory: [PERSON.familyHistory[0]] })).toBe(false)
})

test("steps past the source's line count as its top", () => {
  const [steps] = readingsFor().get("heart-disease") ?? []
  expect(steps?.dose(HELD, 41)).toBeCloseTo(0.4)
})

test("BMI is read against the people's mean, past the source's change point", () => {
  const bmi = (readingsFor().get("stroke") ?? [])[9]
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

test("holding the safety level at 3 or above takes away the time below 3 and below 0", () => {
  const safety = LEVERS.find((one) => one.named.includes("safety level"))
  expect(safety?.to({ ...HELD, shareBelowZero: 0.1 })).toEqual({
    ...HELD,
    shareBelowThree: 0,
    shareBelowZero: 0,
  })
})

test("only long sleep is marked as confounded", () => {
  const confounded = LEVERS.filter((one) => one.evidence === "confounded").map((one) => one.named)
  expect(confounded).toEqual(["sleep down to 7 hours"])
})
