import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  inferenceWanScore,
  readScore,
} from "akasha/commands/pages/inference/wan/score/inference-wan-score.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference wan score", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the flags it needs", async () => {
  const said = await inferenceWanScore([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--frames-dir")
})

test("the reference is named as well as the directory", () => {
  const said = readScore(["--frames-dir", "f"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--reference")
})

test("the default cosine holds where nothing said one", () => {
  const said = readScore(["--frames-dir", "f", "--reference", "r.png"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) expect(said.said.get("--floor")).toBe("0.45")
})

test("a cosine that is no number is refused", () => {
  expect(
    "refused" in readScore(["--frames-dir", "f", "--reference", "r.png", "--floor", "high"])
  ).toBe(true)
})

test("a flag another command takes is refused here", () => {
  const said = readScore(["--frames-dir", "f", "--reference", "r.png", "--lightning"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--lightning")
})
