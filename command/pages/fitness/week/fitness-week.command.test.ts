import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Tally } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import {
  fitnessWeek,
  muscleRows,
  patternRows,
  sayingOf,
} from "akasha/command/pages/fitness/week/fitness-week.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const NOTHING: Tally = {
  muscles: new Map(),
  patterns: new Map(),
  counted: 0,
  passed: 0,
}

const A_PRESS: Tally = {
  muscles: new Map([
    ["chest", 1],
    ["triceps", 1],
  ]),
  patterns: new Map([["h-push", 1]]),
  counted: 1,
  passed: 0,
}

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
  const rows = muscleRows(A_PRESS, 6, 12)
  const chest = rows.findIndex((one) => one.includes("chest"))
  const calves = rows.findIndex((one) => one.includes("calves"))
  expect(calves).toBeLessThan(chest)
})

test("a muscle with no set in the week is answered rather than left out", () => {
  const rows = muscleRows(NOTHING, 6, 12)
  expect(rows.length).toBe(17)
  expect(rows.every((one) => one.endsWith("owed 6"))).toBe(true)
})

test("a pattern is answered most worked first", () => {
  expect(patternRows(A_PRESS)[0]).toContain("h-push")
})

test("a word this takes no argument for is refused", () => {
  const said = fitnessWeek(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
