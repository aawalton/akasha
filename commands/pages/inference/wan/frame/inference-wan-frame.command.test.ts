import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { pathUnder } from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"
import { inferenceWanFrame } from "akasha/commands/pages/inference/wan/frame/inference-wan-frame.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference wan frame", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the flag it needs", async () => {
  const said = await inferenceWanFrame([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--video")
})

test("a flag another command takes is refused here", async () => {
  const said = await inferenceWanFrame(["--video", "clip.mp4", "--lightning"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--lightning")
})

test("a flag carrying no value is refused rather than read as said", async () => {
  expect((await inferenceWanFrame(["--video"], given("/nowhere"))).code).toBe(1)
})

test("a word where a flag should be is refused", async () => {
  const said = await inferenceWanFrame(["clip.mp4"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("clip.mp4")
})

test("a whole number flag carrying something else is refused", async () => {
  const said = await inferenceWanFrame(["--video", "clip.mp4", "--fps", "four"], given("/nowhere"))
  expect(said.code).toBe(1)
})

test("a rate under one frame a second is refused", async () => {
  const said = await inferenceWanFrame(["--video", "clip.mp4", "--fps", "0"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--fps")
})

test("a flag carrying its value at an equals sign is taken rather than refused", async () => {
  const said = await inferenceWanFrame(["--video=/nowhere/none.mp4"], given("/nowhere"))
  expect(said.code).toBe(2)
})

test("a clip that is not there answers against the data", async () => {
  const said = await inferenceWanFrame(["--video", "/nowhere/none.mp4"], given("/nowhere"))
  expect(said.code).toBe(2)
})

test("a relative path is read against the root rather than the calling folder", () => {
  expect(pathUnder("/repo", "clips/one.mp4")).toBe("/repo/clips/one.mp4")
  expect(pathUnder("/repo", "/elsewhere/one.mp4")).toBe("/elsewhere/one.mp4")
})
