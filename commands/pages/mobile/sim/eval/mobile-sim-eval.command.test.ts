import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { attachedSaid } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import {
  answering,
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Running } from "akasha/commands/pages/mobile/sim/eval/mobile-sim-eval.command.code.ts"
import {
  evaluated,
  mobileSimEval,
  scriptIn,
  sentSaid,
} from "akasha/commands/pages/mobile/sim/eval/mobile-sim-eval.command.code.ts"

const ARGV = ["--script", "return 1"]

const CALLED_AS = "akasha mobile sim eval"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const SWITCHED = attachedSaid("sess-1", "WEBVIEW_9")

const NO_ANSWER = new Error("the script never answered")

test("a run that switched the sim context and then threw names that switch", async () => {
  const said = await mobileSimEval(ARGV, GIVEN, throwingAfter([SWITCHED], NO_ANSWER))

  expect(said.report).toEqual([SWITCHED])
  expect(said.refusals.at(-1)).toBe(partWay([SWITCHED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it reached the session names the fault alone", async () => {
  const said = await mobileSimEval(ARGV, GIVEN, throwingAfter([], NO_ANSWER))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the script never answered")
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
})

test("a run that did two things names both of them in one sentence", async () => {
  const wrote = [SWITCHED, "the script was sent"]
  const said = await mobileSimEval(ARGV, GIVEN, throwingAfter(wrote, NO_ANSWER))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toContain(`${SWITCHED}; the script was sent`)
})

test("a call naming no script is refused before the session is reached", async () => {
  const said = await mobileSimEval([], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--script")
})

test("two bare words are refused, since this takes one script", async () => {
  const said = await mobileSimEval(["return 1", "return 2"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    `\`${CALLED_AS}\` takes 1 word and this call says 2 words — nothing takes \`return 2\``
  )
})

test("a script said as a word and at its flag is refused", async () => {
  const said = await mobileSimEval(["--script", "return 1", "return 2"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--script")
})

test("a flag this takes no argument at is refused by name", async () => {
  const said = await mobileSimEval(["--bogus"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--script")
})

test("a script said is the script run, and nothing is piped in for it", () => {
  expect(scriptIn("return 1")).toEqual({ script: "return 1" })
})

const PIPED_SCRIPT = { bytes: new TextEncoder().encode("return 2") }

const PIPED_BLANK = { bytes: new TextEncoder().encode("  \n") }

test("a dash reads the script from what is piped in", () => {
  expect(scriptIn("-", () => PIPED_SCRIPT)).toEqual({ script: "return 2" })
})

test("a dash with a terminal on the other end is refused", () => {
  const said = scriptIn("-", () => ({ tty: true }))

  expect(said).toEqual({
    refused: ["`--script -` reads the script from what is piped in, and nothing was"],
  })
})

test("a dash piped only whitespace is refused", () => {
  const said = scriptIn("-", () => PIPED_BLANK)

  expect(said).toEqual({ refused: ["`--script -` was piped nothing that could be a script"] })
})

const STATE = { appiumBase: "http://mac:4723", sessionId: "sess-1" } as SimSessionState

const SCRIPT = "window.localStorage.clear()"

function running(over: Partial<Running> = {}): Running {
  return {
    state: () => Promise.resolve(STATE),
    ran: () => Promise.resolve(null),
    ...over,
  }
}

const UNANSWERED = running({
  ran: () => Promise.reject(new OperationalError("the webview never answered")),
})

test("a script is named as sent before that script goes out", async () => {
  const done: string[] = []

  await evaluated(done, { script: SCRIPT }, running())
  expect(done).toEqual([sentSaid(SCRIPT)])
})

test("a script that threw after it went out is not read as a script that never ran", async () => {
  const held = await answering(
    async (done) => await evaluated(done, { script: SCRIPT }, UNANSWERED)
  )

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([sentSaid(SCRIPT)])
  const last = held.refusals.at(-1) as string
  expect(last).toContain(`sent ${SCRIPT.length} characters of script to the webview`)
  expect(last).toContain("not read back here")
})
