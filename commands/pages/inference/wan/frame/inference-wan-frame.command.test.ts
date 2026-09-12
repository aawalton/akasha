import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  inferenceWanFrames,
  readFrames,
} from "akasha/commands/pages/inference/wan/frame/inference-wan-frame.command.code.ts"
import { at } from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference wan frames", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the flag it needs", async () => {
  const said = await inferenceWanFrames([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--video")
})

test("a flag another command takes is refused here", () => {
  const said = readFrames(["--video", "clip.mp4", "--lightning"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--lightning")
})

test("a flag carrying no value is refused rather than read as said", () => {
  expect("refused" in readFrames(["--video"])).toBe(true)
})

test("a word where a flag should be is refused", () => {
  const said = readFrames(["clip.mp4"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("no flag")
})

test("a whole number flag carrying something else is refused", () => {
  expect("refused" in readFrames(["--video", "clip.mp4", "--fps", "four"])).toBe(true)
})

test("a clip that is not there answers against the data", async () => {
  const said = await inferenceWanFrames(["--video", "/nowhere/none.mp4"], given("/nowhere"))
  expect(said.code).toBe(2)
})

test("a relative path is read against the root rather than the calling folder", () => {
  expect(at(given("/repo"), "clips/one.mp4")).toBe("/repo/clips/one.mp4")
  expect(at(given("/repo"), "/elsewhere/one.mp4")).toBe("/elsewhere/one.mp4")
})
