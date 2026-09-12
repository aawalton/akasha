import { expect, test } from "bun:test"
import { DataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  partWay,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Scoring } from "akasha/commands/pages/inference/wan/score/inference-wan-score.command.code.ts"
import {
  inferenceWanScore,
  relabelledSaid,
} from "akasha/commands/pages/inference/wan/score/inference-wan-score.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference wan score", from: root, writer: null, agentId: null }
}

const SCORED = ["--frames-dir", "f", "--reference", "r.png"]

const noting: Scoring = (done, taken) => {
  done.push(taken.floor)
  return Promise.resolve(told(done))
}

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

test("the reference is named as well as the directory", async () => {
  const said = await inferenceWanScore(["--frames-dir", "f"], given("/nowhere"), noting)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--reference")
})

test("the default cosine holds where nothing said one", async () => {
  const said = await inferenceWanScore(SCORED, given("/nowhere"), noting)
  expect(said.report).toEqual(["0.45"])
})

test("a cosine that is no number is refused", async () => {
  const said = await inferenceWanScore([...SCORED, "--floor", "high"], given("/nowhere"), noting)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("high")
})

test("a cosine said at an equals sign is taken rather than refused", async () => {
  const said = await inferenceWanScore([...SCORED, "--floor=0.8"], given("/nowhere"), noting)
  expect(said.report).toEqual(["0.8"])
})

test("a flag another command takes is refused here", async () => {
  const said = await inferenceWanScore([...SCORED, "--lightning"], given("/nowhere"), noting)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--lightning")
})
