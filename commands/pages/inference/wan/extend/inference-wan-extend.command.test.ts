import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  inferenceWanExtend,
  readExtend,
} from "akasha/commands/pages/inference/wan/extend/inference-wan-extend.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference wan extend", from: root, writer: null, agentId: null }
}

const CALLED = "akasha inference wan extend"

const EXTENDED = ["--context", "c.mp4", "--direction", "forward", "--prompt", "a stroll"]

test("nothing said is refused, naming the flags it needs", async () => {
  const said = await inferenceWanExtend([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--context")
})

test("naming no prompt at all is the caller's mistake", () => {
  const said = readExtend(["--context", "c.mp4", "--direction", "forward"], CALLED)
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--prompt-file")
})

test("a flag said twice is refused rather than the last winning", () => {
  const said = readExtend(["--context", "one.mp4", "--context", "two.mp4"], CALLED)
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("said twice")
})

test("the frame counts hold the defaults their pages state", () => {
  const said = readExtend(EXTENDED, CALLED)
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) {
    expect(said.taken.contextFrames).toBe(24)
    expect(said.taken.newFrames).toBe(16)
  }
})

test("the prompt and the file it sits in are never said together", () => {
  const said = readExtend([...EXTENDED, "--prompt-file", "p.txt"], CALLED)
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--prompt-file")
})

test("a flag carrying its value at an equals sign is taken rather than refused", () => {
  const said = readExtend([...EXTENDED, "--new-frames=32"], CALLED)
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) expect(said.taken.newFrames).toBe(32)
})

test("a direction that is neither way is refused", async () => {
  const said = await inferenceWanExtend(
    ["--context", "c.mp4", "--direction", "sideways", "--prompt", "a stroll"],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("forward")
})
