import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  agesOf,
  medicineCauses,
  percentOf,
  rowOf,
} from "akasha/command/pages/medicine/causes/medicine-causes.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a chance is said as a percent with its range", () => {
  expect(percentOf({ low: 0.1, middle: 0.2, high: 0.3 })).toBe("20.0%  (10.0 to 30.0)")
})

test("a cause no one dies of in the run has no age", () => {
  expect(agesOf(null)).toBe("")
  expect(agesOf({ low: 60, middle: 80, high: 95 })).toBe("80  (60 to 95)")
})

test("a row names the cause, its chance and its age", () => {
  const row = rowOf({
    cause: "stroke",
    chance: { low: 0.01, middle: 0.02, high: 0.03 },
    age: { low: 70, middle: 80, high: 90 },
  })
  expect(row).toContain("stroke")
  expect(row).toContain("2.0%")
  expect(row.endsWith("80  (70 to 90)")).toBe(true)
})

test("a word this takes no argument for is refused", () => {
  const said = medicineCauses(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
