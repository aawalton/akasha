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
import { measureGuard } from "akasha/command/pages/measure/guard/measure-guard.command.code.ts"
import { measureGuard as page } from "akasha/command/pages/measure/guard/measure-guard.command.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const CALLED_AS = "akasha measure guard"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const CHOSEN = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NO_WINDOW = "5y"

const OVER_TOOLS = "PreToolUse"

const OVER_STOP = "Stop"

const HOOK = "agent-hook"

const ASKING = "inference-hook"

const HOOK_SLUG = "held-guard"

const HOOK_PAGE = "temper/held-guard/held-guard.agent-hook.ts"

const HOOK_ROWS = "temper/held-guard/held-guard.agent-hook.entries.uncommitted.jsonl"

const ASKING_SLUG = "held-asking"

const ASKING_PAGE = "temper/held-asking/held-asking.inference-hook.ts"

const ASKING_ROWS = "temper/held-asking/held-asking.inference-hook.entries.uncommitted.jsonl"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const guardRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureGuard(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

const guardRow = (one: Record<string, unknown>): string =>
  JSON.stringify({
    runId: ONE,
    phase: OVER_TOOLS,
    ran: "held-guard",
    ranAt: sinceNow(HOUR),
    wallMs: 0,
    cpuSeconds: 0,
    childCpuSeconds: 1,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 2048,
    peakMeasured: true,
    pathsChanged: 0,
    refusals: 0,
    ...one,
  })

const rootHolding = (
  held: Readonly<Record<string, readonly Record<string, unknown>[]>>
): string => {
  const root = scratch.rootFor("measure-guard-")
  nothingFiled(root)
  listedFiled(root, HOOK, HOOK_SLUG, [{ path: HOOK_PAGE, id: ONE }])
  valueAlsoFiled(root, HOOK, [
    {
      path: HOOK_PAGE,
      value: { id: ONE, pageTypeSlug: HOOK, slug: HOOK_SLUG, runsAt: [OVER_TOOLS] },
    },
  ])
  listedFiled(root, ASKING, ASKING_SLUG, [{ path: ASKING_PAGE, id: TWO }])
  valueAlsoFiled(root, ASKING, [
    {
      path: ASKING_PAGE,
      value: { id: TWO, pageTypeSlug: ASKING, slug: ASKING_SLUG, runsAt: [OVER_STOP] },
    },
  ])
  for (const [at, rows] of Object.entries(held)) {
    put(root, at, `${rows.map(guardRow).join("\n")}\n`)
  }
  return root
}

const saidOver = (held: Readonly<Record<string, readonly Record<string, unknown>[]>>): string =>
  measureGuard([], { ...GIVEN, root: rootHolding(held) }).report.join("\n")

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(CHOSEN).toBe(runWindow.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = guardRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${CHOSEN}\``)
})

test("the window with no value after it is refused", () => {
  expect(guardRefusing([CHOSEN])[0]).toBe(`\`${CHOSEN}\` takes a value, and none follows it`)
})

test("the window said twice is refused, and one call says it once", () => {
  const said = guardRefusing([CHOSEN, "5", CHOSEN, "10"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("a window that is neither a count of runs nor a period is refused after it is taken", () => {
  const said = guardRefusing([CHOSEN, NO_WINDOW])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NO_WINDOW)
  expect(said[0]).toContain(CHOSEN)
})

test("a call naming no window reads the past twenty-four hours", () => {
  const said = saidOver({
    [HOOK_ROWS]: [
      { ran: "fresh-guard" },
      { runId: TWO, ran: "stale-guard", ranAt: sinceNow(DAY + HOUR) },
    ],
  })

  expect(said).toContain("fresh-guard")
  expect(said).not.toContain("stale-guard")
})

test("a row naming a test run beside the same page counts nowhere here", () => {
  const said = saidOver({
    [HOOK_ROWS]: [{ ran: "kept-guard" }, { runId: TWO, phase: "test", ran: "left-guard" }],
  })

  expect(said).toContain("kept-guard")
  expect(said).not.toContain("left-guard")
})

test("an inference hook is dispatched the same way and is read here too", () => {
  const said = saidOver({
    [HOOK_ROWS]: [{ ran: "tooling-guard" }],
    [ASKING_ROWS]: [{ runId: TWO, phase: OVER_STOP, ran: "asking-guard" }],
  })

  expect(said).toContain("tooling-guard")
  expect(said).toContain("asking-guard")
})
