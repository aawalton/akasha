import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceVoiceDesign } from "akasha/commands/pages/inference/voice/design/inference-voice-design.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference voice design",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("naming neither a description nor text is refused for both", async () => {
  const said = await inferenceVoiceDesign([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.some((one) => one.includes("--instruct"))).toBe(true)
  expect(said.refusals.some((one) => one.includes("--text"))).toBe(true)
})

test("naming a description without text is refused", async () => {
  const said = await inferenceVoiceDesign(["--instruct", "a low voice"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--text")
})

test("a backend this does not speak through is refused", async () => {
  const said = await inferenceVoiceDesign(
    ["--instruct", "a low voice", "--text", "hi", "--service", "nowhere"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`nowhere` is none of them")
})

test("a flag this takes none of is refused, and the flags it takes are named", async () => {
  const said = await inferenceVoiceDesign(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
  expect(said.refusals[0]).toContain("--instruct-file")
})
