import { expect, test } from "bun:test"
import { landedMechanically } from "@akasha/command-system/asking"
import { landedChecked } from "@akasha/command-system/checked-landing"
import type { Composed } from "../landing/migration-landing.module.code.ts"
import { landingFor, takesAway } from "./migration-checked-landing.module.code.ts"

const WROTE: Composed = { path: "akasha/one.ts", body: "one" }

const TOOK: Composed = { path: "akasha/two.ts", body: null }

test("bodies that only write take nothing away", () => {
  expect(takesAway([WROTE, WROTE])).toBe(false)
})

test("one body of nothing takes a file away", () => {
  expect(takesAway([WROTE, TOOK])).toBe(true)
})

test("nothing composed takes nothing away", () => {
  expect(takesAway([])).toBe(false)
})

test("bodies that take a file away land through the checks", () => {
  expect(landingFor([WROTE, TOOK])).toBe(landedChecked)
})

test("bodies that only write land the way they landed before", () => {
  expect(landingFor([WROTE])).toBe(landedMechanically)
})
