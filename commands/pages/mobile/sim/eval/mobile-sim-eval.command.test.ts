import { expect, test } from "bun:test"
import { attachedSaid } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import {
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { mobileSimEval } from "akasha/commands/pages/mobile/sim/eval/mobile-sim-eval.command.code.ts"

const ARGV = ["--script", "return 1"]

const SWITCHED = attachedSaid("sess-1", "WEBVIEW_9")

const NO_ANSWER = new Error("the script never answered")

test("a run that switched the sim context and then threw names that switch", async () => {
  const said = await mobileSimEval(ARGV, throwingAfter([SWITCHED], NO_ANSWER))

  expect(said.report).toEqual([SWITCHED])
  expect(said.refusals.at(-1)).toBe(partWay([SWITCHED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it reached the session names the fault alone", async () => {
  const said = await mobileSimEval(ARGV, throwingAfter([], NO_ANSWER))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the script never answered")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("a run that did two things names both of them in one sentence", async () => {
  const wrote = [SWITCHED, "the script was sent"]
  const said = await mobileSimEval(ARGV, throwingAfter(wrote, NO_ANSWER))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toContain(`${SWITCHED}; the script was sent`)
})
