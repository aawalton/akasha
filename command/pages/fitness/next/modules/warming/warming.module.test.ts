import { expect, test } from "bun:test"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  mobilisingFor,
  movingIn,
  warmedOf,
  warmthIn,
  warmupFor,
} from "akasha/command/pages/fitness/next/modules/warming/warming.module.code.ts"

const NOW = new Date("2026-09-18T17:00:00.000Z")

const LOADS = [3, 5, 8, 10, 15, 20, 25, 30]

const BENCH = movement("dumbbell-bench-press", { muscles: ["chest", "triceps"] })

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

const MOVEMENTS = new Map([BENCH, MOVING, HELD].map((one) => [one.slug, one]))

const WARMING = { raising: 5, mobilising: 2, share: 0.5, reps: 10 }

const COLD = { ...WARMING, warm: false, ramped: false }

test("Alan is warm where a set of his falls inside the window handed in", () => {
  const sets = [
    { setPerformedAt: "2026-09-18T16:52:00.000Z", exercise: "strength-exercise/hammer-curls" },
  ]
  const held = warmthIn(sets, NOW, 15)
  expect(held.warm).toBe(true)
  expect(held.ramped).toEqual(new Set(["hammer-curls"]))
})

test("a set older than the window leaves Alan cold", () => {
  const sets = [{ setPerformedAt: "2026-09-18T16:30:00.000Z", exercise: "x/y" }]
  expect(warmthIn(sets, NOW, 15).warm).toBe(false)
})

test("a set stating no instant leaves Alan cold whatever day that set falls on", () => {
  expect(warmthIn([{ day: "day/day-2026-09-18", exercise: "x/y" }], NOW, 15).warm).toBe(false)
})

test("a movement mobilises where its pattern is mobility and its force is not static", () => {
  expect(movingIn(MOVEMENTS).map((one) => one.slug)).toEqual(["dynamic-chest-stretch"])
})

test("the movements offered are those sharing a muscle with the movement to come", () => {
  expect(mobilisingFor(MOVEMENTS, BENCH.muscles, 2)).toEqual(["Dynamic Chest Stretch"])
  expect(mobilisingFor(MOVEMENTS, ["calves"], 2)).toEqual([])
})

test("a cold Alan raises, mobilises and ramps", () => {
  const held = warmupFor(BENCH, 30, LOADS, MOVEMENTS, COLD)
  expect(held).toEqual({
    raise: 5,
    mobilise: ["Dynamic Chest Stretch"],
    ramp: { weight: 15, reps: 10 },
  })
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
  expect(warmedOf(held)).toEqual(["  ramp: 10 easy reps"])
})

test("a warmup is said in the order it is done", () => {
  expect(warmedOf(warmupFor(BENCH, 30, LOADS, MOVEMENTS, COLD))).toEqual([
    "  raise: 5 minutes easy, until you are breathing and damp",
    "  mobilise: Dynamic Chest Stretch",
    "  ramp: 15 lb, 10 easy reps",
  ])
  expect(warmedOf(null)).toEqual([])
})
