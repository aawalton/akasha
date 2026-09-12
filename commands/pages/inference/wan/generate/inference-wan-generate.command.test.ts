import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  inferenceWanGenerate,
  readGenerate,
} from "akasha/commands/pages/inference/wan/generate/inference-wan-generate.command.code.ts"

const CALLED = "akasha inference wan generate"

function given(root: string): Given {
  return {
    root,
    calledAs: "akasha inference wan generate",
    from: root,
    writer: null,
    agentId: null,
  }
}

const RENDERED = ["--prompt", "a stroll", "--start-image", "a.png"]

test("nothing said is refused, naming the flags it needs", async () => {
  const said = await inferenceWanGenerate([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals.join(" ")).toContain("--prompt")
})

test("a flag another command takes is refused here", () => {
  const said = readGenerate([...RENDERED, "--video", "clip.mp4"], CALLED)
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--video")
})

test("a switch is held apart from a flag carrying a value", () => {
  const said = readGenerate([...RENDERED, "--lightning"], CALLED)
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) {
    expect(said.taken.lightning).toBe(true)
    expect(said.taken.renderPrompt).toBe("a stroll")
  }
})

test("the clip length holds the default its page states", () => {
  const said = readGenerate(RENDERED, CALLED)
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) expect(said.taken.clipFrames).toBe(81)
})

test("the prompt and the file it sits in are never said together", () => {
  const said = readGenerate([...RENDERED, "--prompt-file", "p.txt"], CALLED)
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--prompt-file")
})

test("a flag carrying its value at an equals sign is taken rather than refused", () => {
  const said = readGenerate(["--prompt=a stroll", "--start-image=a.png", "--steps=8"], CALLED)
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) expect(said.taken.steps).toBe(8)
})

test("naming neither conditioning image is the caller's mistake", () => {
  const said = readGenerate(["--prompt", "a stroll"], CALLED)
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--start-image")
})

test("naming no prompt at all is the caller's mistake", () => {
  const said = readGenerate(["--start-image", "a.png"], CALLED)
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--prompt-file")
})
