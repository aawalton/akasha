import { expect, test } from "bun:test"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  stepFor,
  steppedOf,
  type Work,
} from "akasha/command/pages/fitness/next/modules/stepping/stepping.module.code.ts"
import type { Warmup } from "akasha/command/pages/fitness/next/modules/warming/warming.module.code.ts"

const SQUATS = movement("bodyweight-squat", { title: "Bodyweight Squat" })

const OPENING = movement("dynamic-chest-stretch", { title: "Dynamic Chest Stretch" })

const WORK: Work = {
  movement: "dumbbell-bench-press",
  title: "Dumbbell Bench Press",
  weight: 30,
  reps: 20,
}

const WHOLE: Warmup = {
  raise: { minutes: 5, movements: [SQUATS] },
  mobilise: [OPENING],
  easyReps: 12,
}

const PAID: Warmup = { ...WHOLE, raise: null, mobilise: [] }

test("the step Alan is on is the raise at the head of the run", () => {
  const step = stepFor(WHOLE, WORK)
  expect(step.kind).toBe("raise")
  expect(step.title).toBe("Bodyweight Squat")
  expect(steppedOf(step)).toEqual(["Bodyweight Squat", "  12 easy reps"])
})

test("a raise with no movement to name is said as the minutes it runs", () => {
  const bare: Warmup = { ...WHOLE, raise: { minutes: 5, movements: [] } }
  expect(steppedOf(stepFor(bare, WORK))).toEqual([
    "5 minutes easy, until you are breathing and damp",
  ])
})

test("a raise Alan has paid gives the step over to the mobilise", () => {
  const step = stepFor({ ...WHOLE, raise: null }, WORK)
  expect(step.kind).toBe("mobilise")
  expect(steppedOf(step)).toEqual([
    "Dynamic Chest Stretch",
    "  12 easy reps, through the whole range",
  ])
})

test("a warmup paid down to nothing gives the step over to the work", () => {
  const step = stepFor(PAID, WORK)
  expect(step.kind).toBe("work")
  expect(steppedOf(step)).toEqual(["Dumbbell Bench Press", "  30 lb, 20 reps"])
})

test("an Alan owed no warmup is on the working set", () => {
  const step = stepFor(null, WORK)
  expect(step.kind).toBe("work")
  expect(steppedOf(step)).toEqual(["Dumbbell Bench Press", "  30 lb, 20 reps"])
})

test("a movement Alan never took near failure is worked by feel", () => {
  const step = stepFor(null, { ...WORK, weight: null, reps: null })
  expect(steppedOf(step)[1]).toContain("find a load")
})

test("no step names the step that follows it", () => {
  for (const warmup of [WHOLE, { ...WHOLE, raise: null }, null]) {
    expect(steppedOf(stepFor(warmup, WORK)).length).toBe(2)
  }
})
