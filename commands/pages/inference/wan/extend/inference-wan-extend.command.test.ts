import { expect, test } from "bun:test"
import { DATA, refused } from "akasha/commands/modules/answering/command-answering.module.code.ts"
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

const STAGED = "the context clip is staged under /nowhere/inputs"

const BROKE = "the model host answered nothing"

test("an extend that threw after staging names the staging in its refusal", async () => {
  const said = await inferenceWanExtend(EXTENDED, given("/nowhere"), (_taken, _given, done) => {
    done.push(STAGED)
    return Promise.reject(new Error(BROKE))
  })

  expect(said.report).toEqual([STAGED])
  expect(said.refusals.join(" ")).toContain(STAGED)
  expect(said.refusals.join(" ")).toContain(BROKE)
})

test("an extend that threw carries the frame it was thrown at", async () => {
  const said = await inferenceWanExtend(EXTENDED, given("/nowhere"), (_taken, _given, done) => {
    done.push(STAGED)
    return Promise.reject(new Error(BROKE))
  })

  expect(said.refusals.some((one) => one.startsWith("thrown at "))).toBe(true)
})

test("an extend that threw before staging names nothing it had done", async () => {
  const said = await inferenceWanExtend(EXTENDED, given("/nowhere"), () =>
    Promise.reject(new Error(BROKE))
  )

  expect(said.report).toEqual([])
  expect(said.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a refusal handed back carries its own code rather than one guessed here", async () => {
  const said = await inferenceWanExtend(EXTENDED, given("/nowhere"), (_taken, _given, done) => {
    done.push(STAGED)
    return Promise.resolve(refused("the window is wider than the clip", DATA))
  })

  expect(said.code).toBe(DATA)
  expect(said.refusals.join(" ")).toContain(STAGED)
})
