import { expect, test } from "bun:test"
import { day } from "akasha/alan/track/daily/day/day.page-type.ts"
import { day20260916 } from "akasha/alan/track/daily/day/pages/2026-09-16/day-2026-09-16.day.ts"
import { day20260917 } from "akasha/alan/track/daily/day/pages/2026-09-17/day-2026-09-17.day.ts"
import { dumbbellBenchPress } from "akasha/alan/value/health/fitness/strength/exercise/pages/dumbbell-bench-press/dumbbell-bench-press.strength-exercise.ts"
import { kneePushUp } from "akasha/alan/value/health/fitness/strength/exercise/pages/knee-push-up/knee-push-up.strength-exercise.ts"
import { strengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.ts"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  type LimitRule,
  liftedOn,
  limitOn,
} from "akasha/command/pages/fitness/today/modules/limiting/limiting.module.code.ts"

const MONDAY = "2026-09-21"

const SUNDAY = "2026-09-27"

const SATURDAY = "2026-09-26"

const RULE: LimitRule = {
  seed: 3000,
  from: MONDAY,
  rise: 20,
  fall: 100,
  legsFactor: 2,
  legsFactorFrom: MONDAY,
}

const DAYS = [
  { dayOfWeek: "monday", focus: "push" },
  { dayOfWeek: "saturday", focus: "legs" },
]

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

test("the limit opens at the seed on the first day a limit bound Alan", () => {
  expect(limitOn(new Map(), RULE, DAYS, MONDAY)).toBe(3000)
})

test("a day that moved its limit raises the next day's limit by the rise", () => {
  const moved = new Map([[MONDAY, 3000]])
  expect(limitOn(moved, RULE, DAYS, "2026-09-22")).toBe(3020)
})

test("a day short of its limit leaves the limit where it was", () => {
  const moved = new Map([[MONDAY, 2999]])
  expect(limitOn(moved, RULE, DAYS, "2026-09-22")).toBe(3000)
})

test("a week that reached its limit on no day lowers the limit by the fall", () => {
  expect(limitOn(new Map(), RULE, DAYS, "2026-09-28")).toBe(2900)
})

test("a week Alan reached once is a week that does not lower the limit", () => {
  const moved = new Map([["2026-09-23", 3000]])
  expect(limitOn(moved, RULE, DAYS, "2026-09-28")).toBe(3020)
})

test("a week is judged once Sunday is past rather than during it", () => {
  expect(limitOn(new Map(), RULE, DAYS, SUNDAY)).toBe(3000)
})

test("a limit never falls below the rise", () => {
  const long: LimitRule = { ...RULE, seed: 150 }
  expect(limitOn(new Map(), long, DAYS, "2026-12-31")).toBe(20)
})

test("a legs day's limit is the limit times the legs factor", () => {
  expect(limitOn(new Map(), RULE, DAYS, SATURDAY)).toBe(6000)
})

test("a legs day that moved its own limit raises the next day's limit by the rise", () => {
  const moved = new Map([[SATURDAY, 6000]])
  expect(limitOn(moved, RULE, DAYS, SUNDAY)).toBe(3020)
})

test("a legs day that moved only the limit of another day leaves the limit where it was", () => {
  const moved = new Map([[SATURDAY, 3000]])
  expect(limitOn(moved, RULE, DAYS, SUNDAY)).toBe(3000)
})

test("a week whose legs day moved only the limit of another day lowers the limit by the fall", () => {
  const moved = new Map([[SATURDAY, 3000]])
  expect(limitOn(moved, RULE, DAYS, "2026-09-28")).toBe(2900)
})

test("a legs day before the legs factor's first day is judged by the limit alone", () => {
  const later: LimitRule = { ...RULE, legsFactorFrom: SUNDAY }
  expect(limitOn(new Map(), later, DAYS, SATURDAY)).toBe(3000)
  expect(limitOn(new Map([[SATURDAY, 3000]]), later, DAYS, SUNDAY)).toBe(3020)
  expect(limitOn(new Map(), later, DAYS, "2026-10-03")).toBe(5800)
})

test("a day of any other focus keeps the limit as it is", () => {
  expect(limitOn(new Map([[MONDAY, 3000]]), RULE, DAYS, MONDAY)).toBe(3000)
  expect(limitOn(new Map(), RULE, DAYS, "2026-09-25")).toBe(3000)
})
