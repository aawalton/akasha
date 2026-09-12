import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  inferenceWanGenerate,
  readGenerate,
} from "akasha/commands/pages/inference/wan/generate/inference-wan-generate.command.code.ts"

function given(root: string): Given {
  return {
    root,
    calledAs: "akasha inference wan generate",
    from: root,
    writer: null,
    agentId: null,
  }
}

test("nothing said is refused, naming the flag it needs", async () => {
  const said = await inferenceWanGenerate([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--prompt")
})

test("a flag another command takes is refused here", () => {
  const said = readGenerate(["--prompt", "a stroll", "--video", "clip.mp4"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--video")
})

test("a switch is held apart from a flag carrying a value", () => {
  const said = readGenerate(["--prompt", "a stroll", "--lightning"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) {
    expect(said.on.has("--lightning")).toBe(true)
    expect(said.said.get("--prompt")).toBe("a stroll")
  }
})

test("the defaults hold where nothing said them", () => {
  const said = readGenerate(["--prompt", "a stroll"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) {
    expect(said.said.get("--size")).toBe("1280x720")
    expect(said.said.get("--frames")).toBe("81")
  }
})

test("naming neither conditioning image is the caller's mistake", async () => {
  const said = await inferenceWanGenerate(["--prompt", "a stroll"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--start-image")
})
