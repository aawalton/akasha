import { expect, test } from "bun:test"
import {
  leveledBy,
  levelsOf,
  ROUTINE_LEVERS,
  ROUTINE_READINGS,
  routineDose,
  routinesOf,
  waitingOn,
} from "akasha/command/pages/medicine/modules/mortality-routines/mortality-routines.module.code.ts"

const LEVELS = levelsOf(
  {
    nutsGramsPerDay: 0,
    inTherapyForDepression: false,
    hasSafetyPlan: true,
    fluVaccination: "none",
    seatbeltUse: "always",
    vo2max: 40.25,
  },
  4
)

test("a person's answers and logged sets are read as levels, and an unanswered one as none", () => {
  expect(LEVELS.strengthMinutes).toBe(10)
  expect(LEVELS.nutsGrams).toBe(0)
  expect(LEVELS.therapy).toBe(0)
  expect(LEVELS.safetyPlan).toBe(1)
  expect(LEVELS.flu).toBe(0)
  expect(LEVELS.seatbelt).toBe(1)
  expect(LEVELS.coffeeCups).toBeNull()
  expect(LEVELS.psa).toBe(0)
})

test("only a change from the current level moves a factor", () => {
  const nuts = (ROUTINE_READINGS.get("heart-disease") ?? []).find((one) =>
    one.factor.startsWith("nuts")
  )
  if (nuts === undefined) throw new Error("no nuts reading")
  const routines = routinesOf(LEVELS)
  expect(routineDose(nuts, routines, 41)).toBe(0)
  expect(routineDose(nuts, { ...routines, at: { ...LEVELS, nutsGrams: 56 } }, 41)).toBe(1)
})

test("fitness is read against the reference, not against the current level", () => {
  const fitness = (ROUTINE_READINGS.get("stroke") ?? []).find(
    (one) => one.factor === "cardiorespiratory fitness"
  )
  if (fitness === undefined) throw new Error("no fitness reading")
  expect(routineDose(fitness, routinesOf(LEVELS), 41)).toBeCloseTo(2.15)
})

test("PSA screening counts only from 55", () => {
  const psa = (ROUTINE_READINGS.get("prostate-cancer") ?? []).find(
    (one) => one.factor === "PSA screening"
  )
  if (psa === undefined) throw new Error("no PSA reading")
  const screened = { ...routinesOf(LEVELS), at: { ...LEVELS, psa: 1 } }
  expect(routineDose(psa, screened, 54)).toBe(0)
  expect(routineDose(psa, screened, 55)).toBe(1)
})

test("an action waits on an answer nobody has given, and otherwise raises the level", () => {
  const coffee = ROUTINE_LEVERS.find((one) => one.routine === "coffeeCups")
  const nuts = ROUTINE_LEVERS.find((one) => one.routine === "nutsGrams")
  if (coffee === undefined || nuts === undefined) throw new Error("no lever")
  const routines = routinesOf(LEVELS)
  expect(waitingOn(coffee, routines)).toBe("coffee-cups-per-day")
  expect(leveledBy(coffee, routines)).toEqual(routines)
  expect(waitingOn(nuts, routines)).toBeNull()
  expect(leveledBy(nuts, routines).at.nutsGrams).toBe(28)
})
