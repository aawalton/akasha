import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceMusic } from "akasha/commands/pages/inference/music/inference-music.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference music",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("naming no prompt either way is refused", async () => {
  const said = await inferenceMusic([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--prompt` or `--prompt-file`")
})

test("naming the prompt both ways is refused", async () => {
  const said = await inferenceMusic(["--prompt", "a waltz", "--prompt-file", "a.txt"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--prompt-file")
})

test("a word beside the flags is refused", async () => {
  const said = await inferenceMusic(["--prompt", "a waltz", "stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})

test("a flag this takes none of is refused, and the flags it takes are named", async () => {
  const said = await inferenceMusic(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
  expect(said.refusals[0]).toContain("--vocal-language")
})

test("steps that are no whole number is refused", async () => {
  const said = await inferenceMusic(["--prompt", "a waltz", "--steps", "many"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`many`")
})
