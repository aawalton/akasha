import { expect, test } from "bun:test"
import { day } from "akasha/alan/track/daily/day/day.page-type.ts"
import { day20260810 } from "akasha/alan/track/daily/day/pages/2026-08-10/day-2026-08-10.day.ts"
import { dumbbellBenchPress } from "akasha/alan/value/health/fitness/strength/exercise/pages/dumbbell-bench-press/dumbbell-bench-press.strength-exercise.ts"
import { strengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.ts"
import {
  dayOf,
  type Movement,
  openedOn,
  tallyOf,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const BENCH = movement(dumbbellBenchPress.slug, {
  title: "Dumbbell Bench Press",
  muscles: ["chest", "triceps"],
})

const MOVEMENTS = new Map<string, Movement>([[BENCH.slug, BENCH]])

const AUGUST_TENTH = `${day.slug}/${day20260810.slug}` as const

function set(on: string, rpe: number | null, warmup = false): Value {
  const made: Record<string, unknown> = {
    day: `${day.slug}/day-${on}`,
    exercise: `${strengthExercise.slug}/${dumbbellBenchPress.slug}`,
  }
  if (rpe !== null) made.rpe = rpe
  if (warmup) made.isWarmup = true
  return made
}

function tally(sets: readonly Value[]) {
  return tallyOf(sets, MOVEMENTS, "2026-08-04", "2026-08-10", 7)
}

test("a window is seven days wide and is named by the day the window ends", () => {
  expect(openedOn("2026-08-10")).toBe("2026-08-04")
})

test("a window reaches across the turn of a month", () => {
  expect(openedOn("2026-03-02")).toBe("2026-02-24")
})

test("a day that will not parse is handed back unchanged", () => {
  expect(openedOn("no-such-day")).toBe("no-such-day")
})

test("a set counts toward every muscle its movement names as primary", () => {
  const held = tally([set("2026-08-10", 8)])
  expect(held.counted).toBe(1)
  expect(held.muscles.get("chest")).toBe(1)
  expect(held.muscles.get("triceps")).toBe(1)
})

test("a set counts toward the pattern its movement names", () => {
  expect(tally([set("2026-08-10", 8)]).patterns.get("h-push")).toBe(1)
})

test("a set under the effort handed in is passed over", () => {
  const held = tally([set("2026-08-10", 6)])
  expect(held.counted).toBe(0)
  expect(held.passed).toBe(1)
})

test("a set stating no effort is passed over", () => {
  expect(tally([set("2026-08-10", null)]).counted).toBe(0)
})

test("a warmup set is passed over", () => {
  expect(tally([set("2026-08-10", 9, true)]).counted).toBe(0)
})

test("a set naming a movement this does not know is passed over", () => {
  const stray: Value = {
    day: AUGUST_TENTH,
    exercise: `${strengthExercise.slug}/nothing-here`,
    rpe: 9,
  }
  const held = tally([stray])
  expect(held.counted).toBe(0)
  expect(held.passed).toBe(1)
})

test("a set outside the window is neither counted nor passed over", () => {
  const held = tally([set("2026-08-03", 8)])
  expect(held.counted).toBe(0)
  expect(held.passed).toBe(0)
})

test("the day a set falls on is read from the day that set names", () => {
  expect(dayOf({ day: AUGUST_TENTH })).toBe(day20260810.date)
  expect(dayOf({})).toBe(null)
})
