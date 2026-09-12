import { expect, test } from "bun:test"
import { inferenceCapabilityList } from "akasha/commands/pages/inference/capability-list/inference-capability-list.command.code.ts"

test("a flag is refused, because this takes none", async () => {
  const said = await inferenceCapabilityList(["--nonsense"])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})

test("a word is refused, because this takes none", async () => {
  const said = await inferenceCapabilityList(["stray"])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
