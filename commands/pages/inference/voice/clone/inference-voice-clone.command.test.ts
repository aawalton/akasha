import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceVoiceClone } from "akasha/commands/pages/inference/voice/clone/inference-voice-clone.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference voice clone",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("naming no text either way is refused", async () => {
  const said = await inferenceVoiceClone([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    "`akasha inference voice clone` takes `--text-file` or `--text`, and nothing said either"
  )
})

test("a value said at the flag with an equals sign is taken", async () => {
  const said = await inferenceVoiceClone(["--text=hi", "--priority=urgent"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`urgent` is none of them")
})

test("a lane the traffic cop does not hold is refused", async () => {
  const said = await inferenceVoiceClone(["--text", "hi", "--priority", "urgent"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`urgent` is none of them")
})

test("a mode the clip cannot be read in is refused", async () => {
  const said = await inferenceVoiceClone(["--text", "hi", "--mode", "other"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`other` is none of them")
})

test("a clip named without its transcript is refused", async () => {
  const said = await inferenceVoiceClone(["--text", "hi", "--ref-audio", "a.wav"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("says what that clip says")
})

test("a flag this takes none of is refused, and the flags it takes are named", async () => {
  const said = await inferenceVoiceClone(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
  expect(said.refusals[0]).toContain("--ref-text-file")
})
