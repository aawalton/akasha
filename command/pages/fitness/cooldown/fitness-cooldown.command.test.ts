import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { fitnessCooldown } from "akasha/command/pages/fitness/cooldown/fitness-cooldown.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a word this takes no argument for is refused", () => {
  const said = fitnessCooldown(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})

test("a gym flag said with no gym is refused", () => {
  const said = fitnessCooldown(["--gym"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--gym")
})
