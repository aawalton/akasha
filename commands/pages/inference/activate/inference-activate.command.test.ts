import { expect, test } from "bun:test"
import {
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceActivate } from "akasha/commands/pages/inference/activate/inference-activate.command.code.ts"
import { askedToActivateSaid } from "akasha/infrastructure/inference/pool/cop-admin/cop-admin.module.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference activate",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const ARGV = ["ollama"]

const ASKED = askedToActivateSaid("ollama", "studio")

const UNREADABLE = new Error("the cop answered something that would not parse")

test("a run that posted the swap and then threw names that post", async () => {
  const said = await inferenceActivate(ARGV, GIVEN, throwingAfter([ASKED], UNREADABLE))

  expect(said.report).toEqual([ASKED])
  expect(said.refusals.at(-1)).toBe(partWay([ASKED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it reached the cop names the fault alone", async () => {
  const said = await inferenceActivate(ARGV, GIVEN, throwingAfter([], UNREADABLE))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the cop answered something that would not parse")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("the post is named as an ask, since the pool may hold neither one now", async () => {
  expect(ASKED).toContain("was asked to make ollama resident")
  expect(ASKED).toContain("may already be evicted")
})

test("naming no pool service is refused", async () => {
  const said = await inferenceActivate([], GIVEN, throwingAfter([], UNREADABLE))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("<name>")
})

test("naming a second pool service is refused", async () => {
  const said = await inferenceActivate(["ollama", "other"], GIVEN, throwingAfter([], UNREADABLE))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("1 word")
})

test("a flag is refused, because the pool service is said as a word", async () => {
  const said = await inferenceActivate(["--nonsense"], GIVEN, throwingAfter([], UNREADABLE))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})
