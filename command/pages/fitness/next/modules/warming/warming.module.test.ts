import { expect, test } from "bun:test"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  mobilisingFor,
  movingIn,
  raisedIn,
  raisingFor,
  raisingIn,
  warmedOf,
  warmthIn,
  warmupFor,
} from "akasha/command/pages/fitness/next/modules/warming/warming.module.code.ts"

const NOW = new Date("2026-09-18T17:00:00.000Z")

const TODAY = "2026-09-18"

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
  covered: COVERED,
  raised: new Map<string, string>(),
  turn: 0,
}

const COLD = { ...WARMING, warm: false, ramped: false }

test("Alan is warm where a set of his falls inside the window handed in", () => {
  const sets = [
    { setPerformedAt: "2026-09-18T16:52:00.000Z", exercise: "strength-exercise/hammer-curls" },
  ]
  const held = warmthIn(sets, NOW, 15, TODAY)
  expect(held.warm).toBe(true)
  expect(held.ramped).toEqual(new Set(["hammer-curls"]))
})

test("a set older than the window leaves Alan cold", () => {
  const sets = [{ setPerformedAt: "2026-09-18T16:30:00.000Z", exercise: "x/y" }]
  expect(warmthIn(sets, NOW, 15, TODAY).warm).toBe(false)
})

test("a set stating no instant leaves Alan cold whatever day that set falls on", () => {
  expect(warmthIn([{ day: "day/day-2026-09-18", exercise: "x/y" }], NOW, 15, TODAY).warm).toBe(
    false
  )
})

test("a raise is offered only where Alan's kit can carry that raise", () => {
  expect(raisingIn(MOVEMENTS, COVERED).map((one) => one.slug)).toEqual([
    "jumping-jacks",
    "shadow-boxing",
  ])
})

test("the raise shares a muscle with the work to come", () => {
  expect(raisingFor(MOVEMENTS, BENCH.muscles, COLD)).toBe("Shadow Boxing")
})

test("a work no raise fits is raised on any raise Alan's kit carries", () => {
  expect(raisingFor(MOVEMENTS, ["lats"], COLD)).toBe("Jumping Jacks")
})

test("the raise Alan performed longest ago is the raise offered", () => {
  const raised = new Map([["jumping-jacks", "2026-09-17"]])
  expect(raisingFor(MOVEMENTS, ["lats"], { ...COLD, raised })).toBe("Shadow Boxing")
})

test("the day parts raises Alan has gone equally long without", () => {
  expect(raisingFor(MOVEMENTS, ["lats"], { ...COLD, turn: 1 })).toBe("Shadow Boxing")
})

test("what Alan raised with is read from the sets logged as cardio", () => {
  const sets = [
    { activityType: "cardio", day: "day/day-2026-09-16", exercise: "x/jumping-jacks" },
    { activityType: "cardio", day: "day/day-2026-09-17", exercise: "x/jumping-jacks" },
    { day: "day/day-2026-09-18", exercise: "x/shadow-boxing" },
  ]
  expect(raisedIn(sets)).toEqual(new Map([["jumping-jacks", "2026-09-17"]]))
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
    raise: { minutes: 5, title: "Shadow Boxing" },
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
    "  raise: Shadow Boxing, 5 minutes easy, until you are breathing and damp",
    "  mobilise: Dynamic Chest Stretch",
    "  ramp: 15 lb, 10 easy reps",
  ])
  expect(warmedOf(null)).toEqual([])
})
