import { expect, test } from "bun:test"
import { day } from "akasha/alan/track/daily/day/day.page-type.ts"
import { day20260917 } from "akasha/alan/track/daily/day/pages/2026-09-17/day-2026-09-17.day.ts"
import { day20260918 } from "akasha/alan/track/daily/day/pages/2026-09-18/day-2026-09-18.day.ts"
import {
  type Cooling,
  cooledOf,
  coolFor,
  coolingFor,
  heldIn,
  takenOn,
  workedOn,
} from "akasha/command/pages/fitness/cooldown/modules/cooling/cooling.module.code.ts"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"

const TODAY = day20260918.date

const EIGHTEENTH = `${day.slug}/${day20260918.slug}` as const

const SEVENTEENTH = `${day.slug}/${day20260917.slug}` as const

const BENCH = movement("dumbbell-bench-press", { muscles: ["chest", "triceps"] })

const CHEST = movement("chest-stretch", {
  title: "Chest Stretch",
  pattern: "mobility",
  category: "stretching",
  force: "static",
  implement: null,
  muscles: ["chest"],
  scoring: "time",
})

const QUADS = movement("quad-stretch", {
  title: "Quad Stretch",
  pattern: "mobility",
  category: "stretching",
  force: null,
  implement: "body-only",
  muscles: ["quadriceps"],
  scoring: "time",
})

const SWINGING = movement("dynamic-chest-stretch", {
  title: "Dynamic Chest Stretch",
  pattern: "mobility",
  category: "stretching",
  force: "pull",
  muscles: ["chest"],
  scoring: "time",
})

const ROLLED = movement("lats-smr", {
  title: "Latissimus Dorsi-SMR",
  pattern: "mobility",
  category: "stretching",
  force: "static",
  implement: "foam-roll",
  muscles: ["lats"],
  scoring: "time",
})

const MOVEMENTS = new Map([BENCH, CHEST, QUADS, SWINGING, ROLLED].map((one) => [one.slug, one]))

const COVERED = new Set(["dumbbell"])

const COOLING: Cooling = {
  stretches: 3,
  seconds: 45,
  worked: ["chest", "triceps"],
  done: new Set<string>(),
  covered: COVERED,
}

test("a stretch cools Alan where it is held rather than driven", () => {
  expect(heldIn(MOVEMENTS, COVERED).map((one) => one.slug)).toEqual([
    "chest-stretch",
    "quad-stretch",
  ])
})

test("a stretch Alan's kit cannot carry is no stretch to offer", () => {
  expect(heldIn(MOVEMENTS, new Set(["foam-roll"])).map((one) => one.slug)).toEqual([
    "chest-stretch",
    "lats-smr",
    "quad-stretch",
  ])
})

test("the muscles to stretch are those the day's sets worked", () => {
  const sets = [
    { day: EIGHTEENTH, exercise: `x/${BENCH.slug}` },
    { day: SEVENTEENTH, exercise: `x/${QUADS.slug}` },
  ]
  expect(workedOn(sets, TODAY, MOVEMENTS)).toEqual(["chest", "triceps"])
})

test("a stretch Alan took today is no muscle he worked", () => {
  const sets = [{ day: EIGHTEENTH, exercise: `x/${CHEST.slug}` }]
  expect(workedOn(sets, TODAY, MOVEMENTS)).toEqual([])
  expect(takenOn(sets, TODAY)).toEqual(new Set([CHEST.slug]))
})

test("the stretches reaching a muscle worked today lead the run", () => {
  expect(coolingFor(MOVEMENTS, COOLING).map((one) => one.slug)).toEqual([
    "chest-stretch",
    "quad-stretch",
  ])
})

test("a stretch Alan logged today is gone from the run", () => {
  const done = new Set([CHEST.slug])
  expect(coolingFor(MOVEMENTS, { ...COOLING, done }).map((one) => one.slug)).toEqual([
    "quad-stretch",
  ])
})

test("a cool down paid in full offers nothing", () => {
  const done = new Set([CHEST.slug])
  expect(coolingFor(MOVEMENTS, { ...COOLING, stretches: 1, done })).toEqual([])
  expect(coolFor(MOVEMENTS, { ...COOLING, stretches: 1, done })).toBe(null)
})

test("the step Alan is on is the stretch at the head of the run", () => {
  expect(cooledOf(coolFor(MOVEMENTS, COOLING))).toEqual(["Chest Stretch", "  hold 45 seconds"])
})

test("a cool down with nothing left says so", () => {
  expect(cooledOf(null)[0]).toContain("cooled down")
})
