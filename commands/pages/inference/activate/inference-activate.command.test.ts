import { expect, test } from "bun:test"
import {
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { inferenceActivate } from "akasha/commands/pages/inference/activate/inference-activate.command.code.ts"
import { askedToActivateSaid } from "akasha/infrastructure/inference/pool/cop-admin/cop-admin.module.code.ts"

const ARGV = ["ollama"]

const ASKED = askedToActivateSaid("ollama", "studio")

const UNREADABLE = new Error("the cop answered something that would not parse")

test("a run that posted the swap and then threw names that post", async () => {
  const said = await inferenceActivate(ARGV, throwingAfter([ASKED], UNREADABLE))

  expect(said.report).toEqual([ASKED])
  expect(said.refusals.at(-1)).toBe(partWay([ASKED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it reached the cop names the fault alone", async () => {
  const said = await inferenceActivate(ARGV, throwingAfter([], UNREADABLE))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the cop answered something that would not parse")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("the post is named as an ask, since the pool may hold neither one now", async () => {
  expect(ASKED).toContain("was asked to make ollama resident")
  expect(ASKED).toContain("may already be evicted")
})
