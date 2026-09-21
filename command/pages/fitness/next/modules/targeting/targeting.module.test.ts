import { expect, test } from "bun:test"
import { day } from "akasha/alan/track/daily/day/day.page-type.ts"
import { day20260916 } from "akasha/alan/track/daily/day/pages/2026-09-16/day-2026-09-16.day.ts"
import { day20260917 } from "akasha/alan/track/daily/day/pages/2026-09-17/day-2026-09-17.day.ts"
import { dumbbellBenchPress } from "akasha/alan/value/health/fitness/strength/exercise/pages/dumbbell-bench-press/dumbbell-bench-press.strength-exercise.ts"
import { kneePushUp } from "akasha/alan/value/health/fitness/strength/exercise/pages/knee-push-up/knee-push-up.strength-exercise.ts"
import { strengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.ts"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  type Aim,
  liftedOn,
  targetOn,
} from "akasha/command/pages/fitness/next/modules/targeting/targeting.module.code.ts"

const MONDAY = "2026-09-21"

const SUNDAY = "2026-09-27"

const AIM: Aim = { seed: 3000, from: MONDAY, rise: 20, fall: 100 }

const PRESS = movement(dumbbellBenchPress.slug, { implementCount: 2 })

const PUSH_UP = movement(kneePushUp.slug, { implement: "body-only", loadFactor: 0.5 })

const MOVEMENTS = new Map([PRESS, PUSH_UP].map((one) => [one.slug, one]))

const SIXTEENTH = `${day.slug}/${day20260916.slug}` as const

const SEVENTEENTH = `${day.slug}/${day20260917.slug}` as const

const PRESS_AT = `${strengthExercise.slug}/${dumbbellBenchPress.slug}` as const

const PUSH_UP_AT = `${strengthExercise.slug}/${kneePushUp.slug}` as const

const SETS = [
  { day: SIXTEENTH, exercise: PRESS_AT, weight: 30, reps: 10 },
  { day: SIXTEENTH, exercise: PUSH_UP_AT, reps: 10 },
  { day: SEVENTEENTH, exercise: PRESS_AT, weight: 20, reps: 5 },
]

test("every set counts toward the day it names", () => {
  const moved = liftedOn(SETS, MOVEMENTS, 177.9)
  expect(moved.get(day20260916.date)).toBe(1489.5)
  expect(moved.get(day20260917.date)).toBe(200)
})

test("a set naming a movement this does not know moves the weight it states alone", () => {
  const stray = [
    { day: SIXTEENTH, exercise: `${strengthExercise.slug}/nowhere`, weight: 10, reps: 3 },
  ]
  expect(liftedOn(stray, MOVEMENTS, 177.9).get(day20260916.date)).toBe(30)
})

test("the target opens at the seed on the first day a target bound Alan", () => {
  expect(targetOn(new Map(), AIM, MONDAY)).toBe(3000)
})

test("a day that moved its target raises the next day's target by the rise", () => {
  const moved = new Map([[MONDAY, 3000]])
  expect(targetOn(moved, AIM, "2026-09-22")).toBe(3020)
})

test("a day short of its target leaves the target where it was", () => {
  const moved = new Map([[MONDAY, 2999]])
  expect(targetOn(moved, AIM, "2026-09-22")).toBe(3000)
})

test("a week that reached its target on no day lowers the target by the fall", () => {
  expect(targetOn(new Map(), AIM, "2026-09-28")).toBe(2900)
})

test("a week Alan met once is a week that does not lower the target", () => {
  const moved = new Map([["2026-09-23", 3000]])
  expect(targetOn(moved, AIM, "2026-09-28")).toBe(3020)
})

test("a week is judged once Sunday is past rather than during it", () => {
  expect(targetOn(new Map(), AIM, SUNDAY)).toBe(3000)
})

test("a target never falls below the rise", () => {
  const long: Aim = { ...AIM, seed: 150 }
  expect(targetOn(new Map(), long, "2026-12-31")).toBe(20)
})
