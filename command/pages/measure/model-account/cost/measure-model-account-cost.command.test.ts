import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { measureModelAccountCost } from "akasha/command/pages/measure/model-account/cost/measure-model-account-cost.command.code.ts"

const NOWHERE = "/nowhere"

const GIVEN: Given = {
  root: NOWHERE,
  calledAs: "akasha measure model-account cost",
  from: NOWHERE,
  writer: null,
  agentId: null,
}

test("a flag is refused, and the refusal says this takes no argument at all", () => {
  const said = measureModelAccountCost(["--days", "7"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--days` is no argument")
  expect(said.refusals[0]).toContain("it takes none")
})

test("a word is refused the way a flag is", () => {
  const said = measureModelAccountCost(["opus"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("it takes none")
})

test("a refused call prices nothing, so no transcript is ever read", () => {
  expect(measureModelAccountCost(["--days", "7"], GIVEN).report).toEqual([])
})
