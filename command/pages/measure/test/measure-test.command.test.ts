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
import { measureTest } from "akasha/command/pages/measure/test/measure-test.command.code.ts"
import { measureTest as page } from "akasha/command/pages/measure/test/measure-test.command.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const CALLED_AS = "akasha measure test"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const CHOSEN = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NO_WINDOW = "5y"

const BESIDE = "temper/held-addon/held-addon.eso-addon.entries.uncommitted.jsonl"

const DEEPER = "temper/held-addon/inner/inner-thing.module.entries.part2.uncommitted.jsonl"

const WALKED_PAST = "node_modules/held-addon/held-addon.module.entries.uncommitted.jsonl"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const testRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureTest(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

const testRow = (one: Record<string, unknown>): string =>
  JSON.stringify({
    runId: ONE,
    phase: "test",
    ran: "held.module.test.ts",
    ranAt: sinceNow(HOUR),
    wallMs: 0,
    cpuSeconds: 0,
    childCpuSeconds: 2,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 1024,
    peakMeasured: true,
    pathsChanged: 0,
    refusals: 0,
    ...one,
  })

const saidOver = (held: Readonly<Record<string, readonly Record<string, unknown>[]>>): string => {
  const root = scratch.rootFor("measure-test-")
  for (const [at, rows] of Object.entries(held)) {
    put(root, at, `${rows.map(testRow).join("\n")}\n`)
  }
  return measureTest([], { ...GIVEN, root }).report.join("\n")
}

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(CHOSEN).toBe(runWindow.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = testRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${CHOSEN}\``)
})

test("the window with no value after it is refused", () => {
  expect(testRefusing([CHOSEN])[0]).toBe(`\`${CHOSEN}\` takes a value, and none follows it`)
})

test("the window said twice is refused, and one call says it once", () => {
  const said = testRefusing([CHOSEN, "5", CHOSEN, "10"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("a window that is neither a count of runs nor a period is refused after it is taken", () => {
  const said = testRefusing([CHOSEN, NO_WINDOW])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NO_WINDOW)
  expect(said[0]).toContain(CHOSEN)
})

test("a call naming no window reads the past twenty-four hours", () => {
  const said = saidOver({
    [BESIDE]: [
      { ran: "fresh.module.test.ts" },
      { runId: TWO, ran: "stale.module.test.ts", ranAt: sinceNow(DAY + HOUR) },
    ],
  })

  expect(said).toContain("fresh.module.test.ts")
  expect(said).not.toContain("stale.module.test.ts")
})

test("a row naming another phase beside the same page is no test run", () => {
  const said = saidOver({
    [BESIDE]: [
      { ran: "kept.module.test.ts" },
      { runId: TWO, phase: "deploy", ran: "left.module.test.ts" },
    ],
  })

  expect(said).toContain("kept.module.test.ts")
  expect(said).not.toContain("left.module.test.ts")
})

test("every entries file the tree holds is read, and a vendored folder is walked past", () => {
  const said = saidOver({
    [BESIDE]: [{ ran: "beside.module.test.ts" }],
    [DEEPER]: [{ runId: TWO, ran: "deeper.module.test.ts" }],
    [WALKED_PAST]: [{ runId: TWO, ran: "vendored.module.test.ts" }],
  })

  expect(said).toContain("beside.module.test.ts")
  expect(said).toContain("deeper.module.test.ts")
  expect(said).not.toContain("vendored.module.test.ts")
})

test("the processor time a spawned run spent is what is reported", () => {
  const said = saidOver({ [BESIDE]: [{ ran: "spawned.module.test.ts", childCpuSeconds: 3 }] })

  expect(said).toContain("3.000s")
})
