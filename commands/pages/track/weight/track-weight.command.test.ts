import { expect, test } from "bun:test"
import { MECHANICAL } from "../../../modules/asking/asking.module.code.ts"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { BODYWEIGHT, poundsIn, trackWeight } from "./track-weight.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha track weight",
  from: "/nowhere",
  writer: null,
  agentId: null,
  changeKind: MECHANICAL,
}

test("a weight in pounds reads as the number it says", () => {
  expect(poundsIn("177.9")).toBe(177.9)
})

test("no weight said is refused rather than taken as nothing", () => {
  expect(poundsIn(null)).toBe(`${BODYWEIGHT} takes a weight in pounds`)
})

test("a weight that reads as no number is refused", () => {
  expect(poundsIn("heavy")).toBe("heavy is no weight in pounds")
})

test("a weight at or below nothing is refused", () => {
  expect(poundsIn("0")).toBe("0 is no weight in pounds")
  expect(poundsIn("-5")).toBe("-5 is no weight in pounds")
})

test("a flag this command does not take is refused before anything is read", async () => {
  const said = await trackWeight(["--date", "2026-09-07"], GIVEN)
  expect(said.refusals).toEqual(["--date is no flag this takes"])
  expect(said.code).toBe(1)
})

test("a call saying no weight is refused before a day is resolved", async () => {
  const said = await trackWeight([], GIVEN)
  expect(said.refusals).toEqual([`${BODYWEIGHT} takes a weight in pounds`])
})
