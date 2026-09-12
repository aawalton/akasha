import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceStatus } from "akasha/commands/pages/inference/status/inference-status.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference status",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a flag is refused, because this takes none", async () => {
  const said = await inferenceStatus(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})

test("a word is refused, because this takes none", async () => {
  const said = await inferenceStatus(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
