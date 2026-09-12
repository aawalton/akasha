import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceCapabilityList } from "akasha/commands/pages/inference/capability-list/inference-capability-list.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference capability-list",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a flag is refused, because this takes none", async () => {
  const said = await inferenceCapabilityList(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})

test("a word is refused, because this takes none", async () => {
  const said = await inferenceCapabilityList(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
