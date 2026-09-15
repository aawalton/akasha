import { afterAll, expect, test } from "bun:test"
import {
  DAY,
  HOUR,
  ONE,
  sinceNow,
  THREE,
  TWO,
} from "akasha/check/modules/measuring/check-measuring.module.test-fixtures.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { saidForPart } from "akasha/command/argument/modules/taking/argument-taking.module.test-fixtures.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { measureDeploy } from "akasha/command/pages/measure/deploy/measure-deploy.command.code.ts"
import { measureDeploy as page } from "akasha/command/pages/measure/deploy/measure-deploy.command.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const CALLED_AS = "akasha measure deploy"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const CHOSEN = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NO_WINDOW = "5y"

const ADDON = "eso-addon"

const ADDON_SLUG = "held-addon"

const ADDON_PAGE = "temper/held-addon/held-addon.eso-addon.ts"

const ADDON_ROWS = "temper/held-addon/held-addon.eso-addon.entries.uncommitted.jsonl"

const WHOLE = "service-workstation"

const WHOLE_PAGE = "temper/held-stations/service-workstation.page-type.ts"

const WHOLE_ROWS = "temper/held-stations/service-workstation.page-type.entries.uncommitted.jsonl"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const deployRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureDeploy(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

const deployRow = (one: Record<string, unknown>): string =>
  JSON.stringify({
    runId: ONE,
    phase: "deploy",
    ran: ADDON_SLUG,
    ranAt: sinceNow(HOUR),
    wallMs: 0,
    cpuSeconds: 1,
    childCpuSeconds: 0,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 0,
    peakMeasured: true,
    pathsChanged: 0,
    refusals: 0,
    ...one,
  })

const bodyOf = (rows: readonly Record<string, unknown>[]): string =>
  `${rows.map(deployRow).join("\n")}\n`

const rootHolding = (
  beside: readonly Record<string, unknown>[],
  whole: readonly Record<string, unknown>[]
): string => {
  const root = scratch.rootFor("measure-deploy-")
  nothingFiled(root)
  listedFiled(root, ADDON, ADDON_SLUG, [{ path: ADDON_PAGE, id: ONE }])
  listedFiled(root, "page-type", WHOLE, [{ path: WHOLE_PAGE, id: TWO }])
  put(root, ADDON_ROWS, bodyOf(beside))
  put(root, WHOLE_ROWS, bodyOf(whole))
  return root
}

const saidOver = (
  beside: readonly Record<string, unknown>[],
  whole: readonly Record<string, unknown>[]
): string => measureDeploy([], { ...GIVEN, root: rootHolding(beside, whole) }).report.join("\n")

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(CHOSEN).toBe(runWindow.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = deployRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${CHOSEN}\``)
})

test("the window with no value after it is refused", () => {
  expect(deployRefusing([CHOSEN])[0]).toBe(`\`${CHOSEN}\` takes a value, and none follows it`)
})

test("the window said twice is refused, and one call says it once", () => {
  const said = deployRefusing([CHOSEN, "5", CHOSEN, "10"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("a window that is neither a count of runs nor a period is refused after it is taken", () => {
  const said = deployRefusing([CHOSEN, NO_WINDOW])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NO_WINDOW)
  expect(said[0]).toContain(CHOSEN)
})

test("a call naming no window reads the past twenty-four hours", () => {
  const said = saidOver(
    [{ ran: "fresh-addon" }, { runId: TWO, ran: "stale-addon", ranAt: sinceNow(DAY + HOUR) }],
    []
  )

  expect(said).toContain("fresh-addon")
  expect(said).not.toContain("stale-addon")
})

test("a row beside such a page naming another phase is no deploy", () => {
  const said = saidOver([{ ran: "put-up-addon" }, { phase: "check", ran: "checked-addon" }], [])

  expect(said).toContain("put-up-addon")
  expect(said).not.toContain("checked-addon")
})

test("the rows beside the page type of a kind put up whole are read too", () => {
  const said = saidOver([{ ran: "one-addon" }], [{ runId: THREE, ran: "whole-station" }])

  expect(said).toContain("one-addon")
  expect(said).toContain("whole-station")
})
