import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  fitnessWeek,
  type Movement,
  muscleRows,
  openedOn,
  patternRows,
  sayingOf,
  tallyOf,
} from "akasha/command/pages/fitness/week/fitness-week.command.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const BENCH: Movement = { muscles: ["chest", "triceps"], pattern: "h-push" }

const MOVEMENTS = new Map<string, Movement>([["dumbbell-bench-press", BENCH]])

function set(on: string, rpe: number | null, warmup = false): Value {
  const made: Record<string, unknown> = {
    setLogDate: on,
    exercise: "strength-exercise/dumbbell-bench-press",
  }
  if (rpe !== null) made.rpe = rpe
  if (warmup) made.isWarmup = true
  return made
}

function tally(sets: readonly Value[]) {
  return tallyOf(sets, MOVEMENTS, "2026-08-04", "2026-08-10", 7)
}

test("the week is the seven days ending on the day named", () => {
  expect(openedOn("2026-08-10")).toBe("2026-08-04")
})

test("the week reaches across the turn of a month", () => {
  expect(openedOn("2026-03-02")).toBe("2026-02-24")
})

test("a set counts toward every muscle its movement names as primary", () => {
  const held = tally([set("2026-08-10", 8)])
  expect(held.counted).toBe(1)
  expect(held.muscles.get("chest")).toBe(1)
  expect(held.muscles.get("triceps")).toBe(1)
})

test("a pattern is counted the way a muscle is counted", () => {
  expect(tally([set("2026-08-10", 8)]).patterns.get("h-push")).toBe(1)
})

test("a set under the effort named counts toward no total", () => {
  const held = tally([set("2026-08-10", 6)])
  expect(held.counted).toBe(0)
  expect(held.passed).toBe(1)
})

test("a set stating no effort counts toward no total", () => {
  expect(tally([set("2026-08-10", null)]).counted).toBe(0)
})

test("a warmup set counts toward no total", () => {
  expect(tally([set("2026-08-10", 9, true)]).counted).toBe(0)
})

test("a set outside the week is neither counted nor passed over", () => {
  const held = tally([set("2026-08-03", 8)])
  expect(held.counted).toBe(0)
  expect(held.passed).toBe(0)
})

test("a muscle under the weekly floor is owed the rest of it", () => {
  expect(sayingOf(2, 6, 12)).toBe("owed 4")
})

test("a muscle between the floor and the ceiling is met", () => {
  expect(sayingOf(8, 6, 12)).toBe("met")
})

test("a muscle above the ceiling is over by the difference", () => {
  expect(sayingOf(15, 6, 12)).toBe("over by 3")
})

test("a muscle under the floor is answered before a muscle above that floor", () => {
  const rows = muscleRows(tally([set("2026-08-10", 8)]), 6, 12)
  const chest = rows.findIndex((one) => one.includes("chest"))
  const calves = rows.findIndex((one) => one.includes("calves"))
  expect(calves).toBeLessThan(chest)
})

test("a muscle with no set in the week is answered rather than left out", () => {
  const rows = muscleRows(tally([]), 6, 12)
  expect(rows.length).toBe(17)
  expect(rows.every((one) => one.endsWith("owed 6"))).toBe(true)
})

test("a pattern is answered most worked first", () => {
  const rows = patternRows(tally([set("2026-08-10", 8)]))
  expect(rows[0]).toContain("h-push")
})

test("a word this takes no argument for is refused", () => {
  const said = fitnessWeek(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
