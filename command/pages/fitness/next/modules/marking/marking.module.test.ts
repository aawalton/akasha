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
  depthOf,
  droppedIn,
  type Mark,
  marksIn,
  turnsIn,
} from "akasha/command/pages/fitness/next/modules/marking/marking.module.code.ts"

const CURLS_AT = `${strengthExercise.slug}/${hammerCurls.slug}` as const

const SIXTEENTH = `${day.slug}/${day20260916.slug}` as const

const BENCH = movement(dumbbellBenchPress.slug)

const INCLINE = movement("incline-dumbbell-press")

const MOVEMENTS = new Map([BENCH, INCLINE].map((one) => [one.slug, one]))

function mark(over: Partial<Mark> = {}): Mark {
  return {
    sets: 4,
    weight: 30,
    reps: 20,
    bestOn: day20260916.date,
    lastOn: day20260916.date,
    staleBouts: 0,
    turns: 0,
    ...over,
  }
}

test("a mark counts only the sets Alan took near failure", () => {
  const sets = [
    { day: SIXTEENTH, exercise: CURLS_AT, weight: 15, reps: 12, rpe: 9 },
    { day: SIXTEENTH, exercise: CURLS_AT, weight: 20, reps: 4, rpe: 4 },
  ]
  const marks = marksIn(sets, 7, day20260918.date)
  expect(marks.get(hammerCurls.slug)?.sets).toBe(1)
  expect(marks.get(hammerCurls.slug)?.weight).toBe(15)
})

test("the best of a movement is the heaviest load, and the most reps at that load", () => {
  const sets = [
    { day: SIXTEENTH, exercise: CURLS_AT, weight: 20, reps: 8, rpe: 9 },
    { day: SIXTEENTH, exercise: CURLS_AT, weight: 20, reps: 11, rpe: 9 },
    { day: SIXTEENTH, exercise: CURLS_AT, weight: 15, reps: 30, rpe: 9 },
  ]
  const held = marksIn(sets, 7, day20260918.date).get(hammerCurls.slug)
  expect(held?.weight).toBe(20)
  expect(held?.reps).toBe(11)
})

test("a movement Alan turns down counts against it as much as a set counts for it", () => {
  const turned = turnsIn([{ declineDate: day20260917.date, exercise: CURLS_AT }], day20260918.date)
  const marks = marksIn([], 7, day20260918.date, turned)
  expect(depthOf(marks.get(hammerCurls.slug))).toBe(-1)
  expect(depthOf(mark({ sets: 1 }))).toBe(1)
})

test("a movement is dropped when that movement stops progressing", () => {
  const marks = new Map([[BENCH.slug, mark({ staleBouts: 3 })]])
  expect(droppedIn(marks, MOVEMENTS, 3)).toEqual(new Set([BENCH.slug]))
})

test("a movement short of that many bouts is kept however long ago it was", () => {
  const marks = new Map([[BENCH.slug, mark({ staleBouts: 2 })]])
  expect(droppedIn(marks, MOVEMENTS, 3).size).toBe(0)
})

test("a dropped movement is offered again once its pattern has progressed elsewhere", () => {
  const marks = new Map([
    [BENCH.slug, mark({ staleBouts: 3 })],
    [INCLINE.slug, mark({ bestOn: day20260918.date, lastOn: day20260918.date })],
  ])
  expect(droppedIn(marks, MOVEMENTS, 3).size).toBe(0)
})
