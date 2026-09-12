import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  inferenceWanExtend,
  readExtend,
} from "akasha/commands/pages/inference/wan/extend/inference-wan-extend.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference wan extend", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the flags it needs", async () => {
  const said = await inferenceWanExtend([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--context")
})

test("a flag said twice is refused rather than the last winning", () => {
  const said = readExtend(["--context", "one.mp4", "--context", "two.mp4"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("more than once")
})

test("the defaults hold where nothing said them", () => {
  const said = readExtend(["--context", "c.mp4", "--direction", "forward", "--prompt", "a stroll"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) {
    expect(said.said.get("--context-frames")).toBe("24")
    expect(said.said.get("--new-frames")).toBe("16")
  }
})

test("a direction that is neither way is refused", async () => {
  const said = await inferenceWanExtend(
    ["--context", "c.mp4", "--direction", "sideways", "--prompt", "a stroll"],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("forward")
})
