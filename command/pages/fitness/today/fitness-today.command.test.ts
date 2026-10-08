import { expect, test } from "bun:test"
import { day } from "akasha/alan/track/daily/day/day.page-type.ts"
import { day20260916 } from "akasha/alan/track/daily/day/pages/2026-09-16/day-2026-09-16.day.ts"
import { day20260917 } from "akasha/alan/track/daily/day/pages/2026-09-17/day-2026-09-17.day.ts"
import { dumbbellBenchPress } from "akasha/alan/value/health/fitness/strength/exercise/pages/dumbbell-bench-press/dumbbell-bench-press.strength-exercise.ts"
import { strengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  fitnessToday,
  type Logged,
  loggedOn,
  saidOf,
  setSaid,
  type Today,
} from "akasha/command/pages/fitness/today/fitness-today.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const PRESS = movement(dumbbellBenchPress.slug, { title: "Dumbbell Bench Press" })

const MOVEMENTS = new Map([[PRESS.slug, PRESS]])

const SET: Logged = {
  movement: PRESS.slug,
  title: "Dumbbell Bench Press",
  weight: 40,
  reps: 16,
  seconds: null,
  rpe: 8,
  warmup: false,
  at: "2026-10-08T12:01:00.000Z",
}

const DAY: Today = {
  day: "2026-10-08",
  weekday: "thursday",
  focus: "push",
  target: 3020.4,
  lifted: 1279.6,
  sets: [SET],
}

const SIXTEENTH = `${day.slug}/${day20260916.slug}` as const

const SEVENTEENTH = `${day.slug}/${day20260917.slug}` as const

const PRESS_AT = `${strengthExercise.slug}/${dumbbellBenchPress.slug}` as const

test("only the sets naming the day are answered, in the order performed", () => {
  const sets = [
    { day: SEVENTEENTH, exercise: PRESS_AT, setPerformedAt: "2026-09-17T12:05:00.000Z", reps: 12 },
    { day: SIXTEENTH, exercise: PRESS_AT, reps: 9 },
    { day: SEVENTEENTH, exercise: PRESS_AT, setPerformedAt: "2026-09-17T12:01:00.000Z", reps: 16 },
  ]
  const logged = loggedOn(sets, MOVEMENTS, day20260917.date)
  expect(logged.map((one) => one.reps)).toEqual([16, 12])
  expect(logged[0]?.title).toBe("Dumbbell Bench Press")
})

test("a set says its load, reps and effort", () => {
  expect(setSaid(SET)).toBe("  Dumbbell Bench Press — 40 lb × 16, RPE 8")
})

test("a timed warmup set says its length and that it warmed", () => {
  const held = {
    ...SET,
    title: "Plank",
    weight: null,
    reps: null,
    seconds: 45,
    rpe: null,
    warmup: true,
  }
  expect(setSaid(held)).toBe("  Plank — 45 s, warmup")
})

test("the answer says the day's focus, the pounds moved against the target, and the sets", () => {
  expect(saidOf(DAY)).toEqual([
    "2026-10-08, thursday — push",
    "1280 lb moved of a 3020 lb target",
    "sets logged today",
    "  Dumbbell Bench Press — 40 lb × 16, RPE 8",
  ])
})

test("a day no schedule names and no set logged are both said", () => {
  expect(saidOf({ ...DAY, focus: null, sets: [] })).toEqual([
    "2026-10-08, a day no schedule names a focus for",
    "1280 lb moved of a 3020 lb target",
    "no set is logged today",
  ])
})

test("a word this takes no argument for is refused", () => {
  const said = fitnessToday(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
