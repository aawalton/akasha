import { expect, test } from "bun:test"
import { day } from "akasha/alan/track/daily/day/day.page-type.ts"
import { day20260916 } from "akasha/alan/track/daily/day/pages/2026-09-16/day-2026-09-16.day.ts"
import { day20260917 } from "akasha/alan/track/daily/day/pages/2026-09-17/day-2026-09-17.day.ts"
import { day20260918 } from "akasha/alan/track/daily/day/pages/2026-09-18/day-2026-09-18.day.ts"
import { dumbbellBenchPress } from "akasha/alan/value/health/fitness/strength/exercise/pages/dumbbell-bench-press/dumbbell-bench-press.strength-exercise.ts"
import { hammerCurls } from "akasha/alan/value/health/fitness/strength/exercise/pages/hammer-curls/hammer-curls.strength-exercise.ts"
import { strengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.ts"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  mobilisingFor,
  movingIn,
  raisedIn,
  raisesIn,
  raisesLeftIn,
  raisingFor,
  raisingIn,
  titleOf,
  warmthIn,
  warmupFor,
} from "akasha/command/pages/fitness/next/modules/warming/warming.module.code.ts"

const NOW = new Date("2026-09-18T17:00:00.000Z")

const TODAY = day20260918.date

const SEPTEMBER_SIXTEENTH = `${day.slug}/${day20260916.slug}` as const

const SEPTEMBER_SEVENTEENTH = `${day.slug}/${day20260917.slug}` as const

const SEPTEMBER_EIGHTEENTH = `${day.slug}/${day20260918.slug}` as const

const HAMMER_CURLS_AT = `${strengthExercise.slug}/${hammerCurls.slug}` as const

const LOADS = [3, 5, 8, 10, 15, 20, 25, 30]

const BENCH = movement(dumbbellBenchPress.slug, { muscles: ["chest", "triceps"] })

const MOVING = movement("dynamic-chest-stretch", {
  title: "Dynamic Chest Stretch",
  pattern: "mobility",
  category: "stretching",
  force: "pull",
})

const HELD = movement("cat-stretch", {
  title: "Cat Stretch",
  pattern: "mobility",
  category: "stretching",
  force: "static",
})

const BOXING = movement("shadow-boxing", {
  title: "Shadow Boxing",
  pattern: "conditioning",
  category: "cardio",
  implement: "body-only",
  muscles: ["shoulders", "chest"],
  scoring: "time",
})

const JACKS = movement("jumping-jacks", {
  title: "Jumping Jacks",
  pattern: "conditioning",
  category: "cardio",
  implement: "body-only",
  muscles: ["shoulders", "calves"],
  scoring: "time",
})

const TREADMILL = movement("running-treadmill", {
  title: "Running, Treadmill",
  pattern: "conditioning",
  category: "cardio",
  implement: "machine",
  muscles: ["quadriceps"],
  scoring: "time",
})

const MOVEMENTS = new Map(
  [BENCH, MOVING, HELD, BOXING, JACKS, TREADMILL].map((one) => [one.slug, one])
)

const COVERED = new Set(["dumbbell"])

const WARMING = {
  raising: 5,
  mobilising: 2,
  share: 0.5,
  reps: 10,
  seconds: 60,
  covered: COVERED,
  raised: new Map<string, string>(),
  turn: 0,
  done: new Set<string>(),
  raisedToday: 0,
}

const COLD = { ...WARMING, warm: false, ramped: false }

test("Alan is warm where a set of his falls inside the window handed in", () => {
  const sets = [{ setPerformedAt: "2026-09-18T16:52:00.000Z", exercise: HAMMER_CURLS_AT }]
  const held = warmthIn(sets, NOW, 15, TODAY)
  expect(held.warm).toBe(true)
  expect(held.ramped).toEqual(new Set([hammerCurls.slug]))
})

test("a set older than the window leaves Alan cold", () => {
  const sets = [{ setPerformedAt: "2026-09-18T16:30:00.000Z", exercise: "x/y" }]
  expect(warmthIn(sets, NOW, 15, TODAY).warm).toBe(false)
})

test("a set stating no instant leaves Alan cold whatever day that set falls on", () => {
  expect(warmthIn([{ day: SEPTEMBER_EIGHTEENTH, exercise: "x/y" }], NOW, 15, TODAY).warm).toBe(
    false
  )
})

test("warming up is not being warm", () => {
  const sets = [
    { activityType: "cardio", setPerformedAt: "2026-09-18T16:52:00.000Z", exercise: "x/y" },
    { activityType: "mobility", setPerformedAt: "2026-09-18T16:55:00.000Z", exercise: "x/z" },
  ]
  expect(warmthIn(sets, NOW, 15, TODAY).warm).toBe(false)
})

test("what Alan has done today is read off the day he did it on", () => {
  const sets = [
    { activityType: "cardio", day: SEPTEMBER_EIGHTEENTH, exercise: "x/shadow-boxing" },
    { activityType: "cardio", day: SEPTEMBER_EIGHTEENTH, exercise: "x/jumping-jacks" },
    { activityType: "cardio", day: SEPTEMBER_SEVENTEENTH, exercise: "x/seal-jacks" },
    { day: SEPTEMBER_EIGHTEENTH, exercise: HAMMER_CURLS_AT },
  ]
  const held = warmthIn(sets, NOW, 15, TODAY)
  expect(held.raisedToday).toBe(2)
  expect(held.done).toEqual(new Set(["shadow-boxing", "jumping-jacks", hammerCurls.slug]))
})

test("a raise is offered only where Alan's kit can carry that raise", () => {
  expect(raisingIn(MOVEMENTS, COVERED).map((one) => one.slug)).toEqual([
    "jumping-jacks",
    "shadow-boxing",
  ])
})

const running = (muscles: readonly string[], given: typeof COLD): readonly string[] =>
  raisingFor(MOVEMENTS, muscles, given).map(titleOf)

test("the raises sharing a muscle with the work to come lead the run", () => {
  expect(running(BENCH.muscles, COLD)).toEqual(["Shadow Boxing", "Jumping Jacks"])
})

test("a work no raise fits is raised on every raise Alan's kit carries", () => {
  expect(running(["lats"], COLD)).toEqual(["Jumping Jacks", "Shadow Boxing"])
})

test("the raise Alan performed longest ago leads the run", () => {
  const raised = new Map([["jumping-jacks", day20260917.date]])
  expect(running(["lats"], { ...COLD, raised })).toEqual(["Shadow Boxing", "Jumping Jacks"])
})

test("the day parts raises Alan has gone equally long without", () => {
  expect(running(["lats"], { ...COLD, turn: 1 })).toEqual(["Shadow Boxing", "Jumping Jacks"])
})

test("the run holds as many raises as the minutes divided by the seconds allow", () => {
  expect(raisesIn(COLD)).toBe(5)
  expect(raisesIn({ ...COLD, raising: 1 })).toBe(1)
  expect(running(["lats"], { ...COLD, raising: 1 })).toEqual(["Jumping Jacks"])
})

test("a raise Alan performed today is gone from the run", () => {
  const done = new Set(["shadow-boxing"])
  expect(running(BENCH.muscles, { ...COLD, done })).toEqual(["Jumping Jacks"])
})

test("the run is shortened by the raises today already holds", () => {
  expect(raisesLeftIn({ ...COLD, raisedToday: 3 })).toBe(2)
  expect(raisesLeftIn({ ...COLD, raisedToday: 9 })).toBe(0)
  expect(running(BENCH.muscles, { ...COLD, raisedToday: 4 })).toEqual(["Shadow Boxing"])
})

test("what Alan raised with is read from the sets logged as cardio", () => {
  const sets = [
    { activityType: "cardio", day: SEPTEMBER_SIXTEENTH, exercise: "x/jumping-jacks" },
    { activityType: "cardio", day: SEPTEMBER_SEVENTEENTH, exercise: "x/jumping-jacks" },
    { day: SEPTEMBER_EIGHTEENTH, exercise: "x/shadow-boxing" },
  ]
  expect(raisedIn(sets)).toEqual(new Map([["jumping-jacks", day20260917.date]]))
})

test("a movement mobilises where its pattern is mobility and its force is not static", () => {
  expect(movingIn(MOVEMENTS).map((one) => one.slug)).toEqual(["dynamic-chest-stretch"])
})

test("the movements offered are those sharing a muscle with the movement to come", () => {
  expect(mobilisingFor(MOVEMENTS, BENCH.muscles, 2).map(titleOf)).toEqual(["Dynamic Chest Stretch"])
  expect(mobilisingFor(MOVEMENTS, ["calves"], 2)).toEqual([])
})

test("a cold Alan raises, mobilises and ramps", () => {
  const held = warmupFor(BENCH, 30, LOADS, MOVEMENTS, COLD)
  expect(held).toEqual({
    raise: { minutes: 5, seconds: 60, movements: [BOXING, JACKS] },
    mobilise: [MOVING],
    ramp: { weight: 15, reps: 10 },
  })
})

test("a mobilise Alan performed today is gone from the warmup", () => {
  const done = new Set([MOVING.slug])
  expect(warmupFor(BENCH, 30, LOADS, MOVEMENTS, { ...COLD, done })?.mobilise).toEqual([])
})

test("a raise paid in full today is no raise to offer", () => {
  const held = warmupFor(BENCH, 30, LOADS, MOVEMENTS, { ...COLD, raisedToday: 5 })
  expect(held?.raise).toBe(null)
})

test("an Alan already warm is owed the ramp alone", () => {
  const held = warmupFor(BENCH, 30, LOADS, MOVEMENTS, { ...COLD, warm: true })
  expect(held).toEqual({ raise: null, mobilise: [], ramp: { weight: 15, reps: 10 } })
})

test("a movement ramped inside the window is owed no warmup at all", () => {
  expect(warmupFor(BENCH, 30, LOADS, MOVEMENTS, { ...COLD, warm: true, ramped: true })).toBe(null)
})

test("a movement with no working weight ramps on reps alone", () => {
  const held = warmupFor(BENCH, null, LOADS, MOVEMENTS, { ...COLD, warm: true })
  expect(held?.ramp).toEqual({ weight: null, reps: 10 })
})
