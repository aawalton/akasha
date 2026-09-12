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
  expect(said.refusals[0]).toBe(
    "`akasha inference music` takes `--prompt-file` or `--prompt`, and nothing said either"
  )
})

test("naming the prompt both ways is refused", async () => {
  const said = await inferenceMusic(["--prompt", "a waltz", "--prompt-file", "a.txt"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    "`--prompt` and `--prompt-file` are never said together, and this call says both"
  )
})

test("a word beside the flags is refused", async () => {
  const said = await inferenceMusic(["--prompt", "a waltz", "stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`stray` is no argument")
})

test("a flag this takes none of is refused, and the flags it takes are named", async () => {
  const said = await inferenceMusic(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--nonsense` is no argument")
  expect(said.refusals[0]).toContain("--vocal-language")
})

test("steps that are no whole number is refused", async () => {
  const said = await inferenceMusic(["--prompt", "a waltz", "--steps", "many"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("`--steps many` is no whole number of nought or more")
})

test("the lyrics said both inline and at a file is refused", async () => {
  const said = await inferenceMusic(
    ["--prompt", "a waltz", "--lyrics", "la la", "--lyrics-file", "a.txt"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    "`--lyrics` and `--lyrics-file` are never said together, and this call says both"
  )
})

test("a prompt file that will not read is refused", async () => {
  const said = await inferenceMusic(["--prompt-file", "nowhere/none.txt"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nowhere/none.txt")
})
