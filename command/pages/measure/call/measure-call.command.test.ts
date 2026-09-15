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
import {
  measureCall,
  shortened,
} from "akasha/command/pages/measure/call/measure-call.command.code.ts"
import { measureCall as page } from "akasha/command/pages/measure/call/measure-call.command.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const CALLED_AS = "akasha measure call"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const CHOSEN = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NO_WINDOW = "5y"

const BASH = "bash"

const SEAT = "seat"

const SEAT_PAGE = "temper/held-chair/held-chair.seat.ts"

const SEAT_ROWS = "temper/held-chair/held-chair.seat.entries.uncommitted.jsonl"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const callRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureCall(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

const callRow = (one: Record<string, unknown>): string =>
  JSON.stringify({
    runId: ONE,
    phase: BASH,
    ran: "ls",
    ranAt: sinceNow(HOUR),
    wallMs: 4,
    cpuSeconds: 0,
    childCpuSeconds: 1,
    peakBytes: 4096,
    residentBeforeBytes: 0,
    peakAddedBytes: 4096,
    peakMeasured: true,
    pathsChanged: 0,
    refusals: 0,
    ...one,
  })

const rootWith = (rows: readonly Record<string, unknown>[]): string => {
  const root = scratch.rootFor("measure-call-")
  nothingFiled(root)
  valueAlsoFiled(root, SEAT, [
    { path: SEAT_PAGE, value: { id: ONE, pageTypeSlug: SEAT, slug: "held-chair" } },
  ])
  put(root, SEAT_ROWS, `${rows.map(callRow).join("\n")}\n`)
  return root
}

const saidFor = (rows: readonly Record<string, unknown>[]): string =>
  measureCall([], { ...GIVEN, root: rootWith(rows) }).report.join("\n")

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(CHOSEN).toBe(runWindow.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = callRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${CHOSEN}\``)
})

test("the window with no value after it is refused", () => {
  expect(callRefusing([CHOSEN])[0]).toBe(`\`${CHOSEN}\` takes a value, and none follows it`)
})

test("a window that is neither a count of runs nor a period is refused after it is taken", () => {
  const said = callRefusing([CHOSEN, NO_WINDOW])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NO_WINDOW)
})

test("a call naming no window reads the past twenty-four hours", () => {
  const said = saidFor([
    { ran: "fresh-call" },
    { runId: TWO, ran: "stale-call", ranAt: sinceNow(DAY + HOUR) },
  ])

  expect(said).toContain("fresh-call")
  expect(said).not.toContain("stale-call")
})

test("a row beside the same page spelling another phase counts nowhere here", () => {
  const said = saidFor([{ ran: "kept-call" }, { runId: TWO, phase: "test", ran: "left-call" }])

  expect(said).toContain("kept-call")
  expect(said).not.toContain("left-call")
})

test("two calls opening their first line alike are gathered as one row", () => {
  const said = saidFor([{ ran: "twice-call" }, { runId: TWO, ran: "twice-call" }])
  const rows = said.split("\n").filter((one) => one.startsWith("twice-call"))

  expect(rows.length).toBe(1)
  expect(rows[0]?.trim().split(/\s+/)[1]).toBe("2")
})

test("a first line no wider than a column holds is left as the agent wrote it", () => {
  expect(shortened("ls -la")).toBe("ls -la")
})

test("a first line past that width is shortened to it", () => {
  const said = shortened("x".repeat(200))

  expect(said.length).toBe(60)
  expect(said.endsWith("...")).toBe(true)
})

test("two long first lines opening alike are gathered as one row", () => {
  const opening = "akasha change draft change-file and a good deal more than a column holds"
  const said = saidFor([{ ran: `${opening} one` }, { runId: TWO, ran: `${opening} two` }])
  const rows = said.split("\n").filter((one) => one.startsWith(shortened(opening)))

  expect(rows.length).toBe(1)
  expect(said).not.toContain("two")
})
