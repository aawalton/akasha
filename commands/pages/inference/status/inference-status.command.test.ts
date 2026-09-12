import { expect, test } from "bun:test"
import { inferenceStatus } from "akasha/commands/pages/inference/status/inference-status.command.code.ts"

test("a flag is refused, because this takes none", async () => {
  const said = await inferenceStatus(["--nonsense"])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})

test("a word is refused, because this takes none", async () => {
  const said = await inferenceStatus(["stray"])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
