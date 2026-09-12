import { expect, test } from "bun:test"
import {
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  decodedSaid,
  inferenceVideoQa,
} from "akasha/commands/pages/inference/video-qa/inference-video-qa.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference video-qa", from: root, writer: null, agentId: null }
}

const ARGV = ["--video", "/clips/one.mp4", "--checklist", "is the sky blue"]

const DECODED = decodedSaid("/clips/one.mp4")

const NO_MODEL = new Error("the vlm would not answer")

test("a run that decoded the clip and then threw names that decoding", async () => {
  const said = await inferenceVideoQa(ARGV, given("/nowhere"), throwingAfter([DECODED], NO_MODEL))

  expect(said.report).toEqual([DECODED])
  expect(said.refusals.at(-1)).toBe(partWay([DECODED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before ffmpeg ran names the fault alone", async () => {
  const said = await inferenceVideoQa(ARGV, given("/nowhere"), throwingAfter([], NO_MODEL))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the vlm would not answer")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("the decoding is named as a run rather than as frames left behind", async () => {
  expect(DECODED).toContain("ffmpeg was run over /clips/one.mp4")
  expect(DECODED).toContain("cleared away again")
})

test("naming neither the clip nor the frames is refused", async () => {
  const said = await inferenceVideoQa(["--checklist", "q"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--frames-dir")
})

test("naming both the clip and the frames is refused", async () => {
  const said = await inferenceVideoQa([...ARGV, "--frames-dir", "d"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--frames-dir")
})

test("the question said at its flag and at its file at once is refused", async () => {
  const said = await inferenceVideoQa([...ARGV, "--checklist-file", "q.txt"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--checklist-file")
})

test("naming no question at all is refused", async () => {
  const said = await inferenceVideoQa(["--video", "/clips/one.mp4"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--checklist")
})

test("a frame count at zero is refused", async () => {
  const said = await inferenceVideoQa([...ARGV, "--frames", "0"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("above zero")
})

test("a flag this does not take is refused", async () => {
  const said = await inferenceVideoQa(["--nonsense"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})

test("a word where a flag should be is refused", async () => {
  const said = await inferenceVideoQa([...ARGV, "stray"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
