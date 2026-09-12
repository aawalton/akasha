import { expect, test } from "bun:test"
import { DataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  inferenceWanScore,
  readScore,
  relabelledSaid,
} from "akasha/commands/pages/inference/wan/score/inference-wan-score.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference wan score", from: root, writer: null, agentId: null }
}

const SCORED = ["--frames-dir", "f", "--reference", "r.png"]

const RELABELLED = relabelledSaid(["/frames", "/ref", "/cache"])

const WENT_AWAY = new Error("podman went away while the scorer ran")

test("a run that relabelled the mounts and then threw names that relabelling", async () => {
  const said = await inferenceWanScore(
    SCORED,
    given("/nowhere"),
    throwingAfter([RELABELLED], WENT_AWAY)
  )

  expect(said.report).toEqual([RELABELLED])
  expect(said.refusals.at(-1)).toBe(partWay([RELABELLED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a fault carrying a code of its own keeps that code rather than the one code", async () => {
  const said = await inferenceWanScore(
    SCORED,
    given("/nowhere"),
    throwingAfter([], new DataError("the reference carries no face"))
  )

  expect(said.report).toEqual([])
  expect(said.code).toBe(DATA)
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

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
