import { expect, test } from "bun:test"
import {
  dayOf,
  type Movement,
  openedOn,
  tallyOf,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const BENCH: Movement = {
  slug: "dumbbell-bench-press",
  title: "Dumbbell Bench Press",
  muscles: ["chest", "triceps"],
  pattern: "h-push",
  category: "strength",
  implement: "dumbbell",
  scoring: "reps",
  sfr: 5,
}

const MOVEMENTS = new Map<string, Movement>([[BENCH.slug, BENCH]])

function set(on: string, rpe: number | null, warmup = false): Value {
  const made: Record<string, unknown> = {
    day: `day/day-${on}`,
    exercise: "strength-exercise/dumbbell-bench-press",
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
    day: "day/day-2026-08-10",
    exercise: "strength-exercise/nothing-here",
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
  expect(dayOf({ day: "day/day-2026-08-10" })).toBe("2026-08-10")
  expect(dayOf({})).toBe(null)
})
