import { expect, test } from "bun:test"
import { inferenceActiveList } from "akasha/commands/pages/inference/active-list/inference-active-list.command.code.ts"

test("a flag is refused, because this takes none", async () => {
  const said = await inferenceActiveList(["--nonsense"])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})

test("a word is refused, because this takes none", async () => {
  const said = await inferenceActiveList(["stray"])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
