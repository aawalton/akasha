import { afterAll, expect, test } from "bun:test"
import {
  DAY,
  HOUR,
  ONE,
  sinceNow,
  TWO,
} from "akasha/check/modules/measuring/check-measuring.module.test-fixtures.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { saidForPart } from "akasha/command/argument/modules/taking/argument-taking.module.test-fixtures.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { measureRound } from "akasha/command/pages/measure/round/measure-round.command.code.ts"
import { measureRound as page } from "akasha/command/pages/measure/round/measure-round.command.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const CALLED_AS = "akasha measure round"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const CHOSEN = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NO_WINDOW = "5y"

const COMMAND = "command"

const AUDIT = "audit"

const HELD_PAGE = "temper/held-audit/held-audit.command.ts"

const HELD_ROWS = "temper/held-audit/held-audit.command.entries.uncommitted.jsonl"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const roundRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureRound(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

const roundRow = (one: Record<string, unknown>): string =>
  JSON.stringify({
    runId: ONE,
    phase: "round",
    ran: "audit",
    ranAt: sinceNow(HOUR),
    wallMs: 0,
    cpuSeconds: 40,
    childCpuSeconds: 980,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 2048,
    peakMeasured: true,
    node: "node-06",
    pathsChanged: 0,
    refusals: 0,
    ...one,
  })

const rootHolding = (rows: readonly Record<string, unknown>[]): string => {
  const root = scratch.rootFor("measure-round-")
  nothingFiled(root)
  listedFiled(root, COMMAND, AUDIT, [{ path: HELD_PAGE, id: ONE }])
  put(root, HELD_ROWS, `${rows.map(roundRow).join("\n")}\n`)
  return root
}

const saidOver = (rows: readonly Record<string, unknown>[]): string =>
  measureRound([], { ...GIVEN, root: rootHolding(rows) }).report.join("\n")

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(CHOSEN).toBe(runWindow.said)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = roundRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${CHOSEN}\``)
})

test("a window that is neither a count of runs nor a period is refused after it is taken", () => {
  const said = roundRefusing([CHOSEN, NO_WINDOW])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NO_WINDOW)
})

test("a call naming no window reads the rounds of the past twenty-four hours", () => {
  const said = saidOver([
    { ran: "fresh-round" },
    { runId: TWO, ran: "stale-round", ranAt: sinceNow(DAY + HOUR) },
  ])
  expect(said).toContain("fresh-round")
  expect(said).not.toContain("stale-round")
})

test("the call a workstation made to ask for a round counts nowhere here", () => {
  const said = saidOver([
    { ran: "kept-round" },
    { runId: TWO, phase: "command", ran: "left-command" },
  ])
  expect(said).toContain("kept-round")
  expect(said).not.toContain("left-command")
})

test("a root whose index names no audit command holds no round", () => {
  const bare = scratch.rootFor("measure-round-bare-")
  nothingFiled(bare)
  expect(measureRound([], { ...GIVEN, root: bare }).refusals).toEqual([])
})
