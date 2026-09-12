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

test("a call naming no script is refused before the session is reached", async () => {
  const said = await mobileSimEval([])

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--script")
})

test("two bare words are refused, since this takes one script", async () => {
  const said = await mobileSimEval(["return 1", "return 2"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("return 2")
})

test("a script said as a word and at its flag is refused", async () => {
  const said = await mobileSimEval(["--script", "return 1", "return 2"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--script")
})

test("a flag this takes no argument at is refused by name", async () => {
  const said = await mobileSimEval(["--bogus"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--script")
})

test("a dash naming what is piped in reaches no piping today", async () => {
  const said = await mobileSimEval(["--script", "-"])

  expect(said.code).toBe(1)
  expect(said.refusals).toEqual([
    "`--script` names a value, and nothing that could be one followed it",
  ])
})

test("a dash said as the bare word reaches no piping today either", async () => {
  const said = await mobileSimEval(["-"])

  expect(said.code).toBe(1)
  expect(said.refusals).toEqual(["`-` is no flag this takes — it takes `--script`"])
})
