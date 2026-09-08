import { afterAll, expect, test } from "bun:test"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import {
  bytesAs,
  chosenIn,
  costOf,
  costsIn,
  footerOf,
  latestOf,
  linesOf,
  meanOf,
  ONE_RUN,
  rankedOf,
  runsIn,
  secondsAs,
  totalOf,
  withinOf,
} from "./check-measuring.module.code.ts"
import {
  agoOf,
  costsOf,
  DAY,
  DAY_BACK,
  HOUR,
  lineOf,
  NOW,
  ONE,
  rowsInto,
  spacedOnce,
  THREE,
  TWO,
} from "./check-measuring.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootWith(held: Record<string, readonly Record<string, unknown>[]>): string {
  return rowsInto(scratch.rootFor("check-measuring-"), held)
}

test("an average is what the runs took together shared out over how many there were", () => {
  expect(meanOf([1, 2, 9])).toBe(4)
  expect(meanOf([1, 2, 3, 10])).toBe(4)
  expect(meanOf([])).toBe(null)
})

test("a run's processor time is its own together with the children it reaped", () => {
  const runs = runsIn(lineOf({ phase: "patch", cpuSeconds: 1.5, childCpuSeconds: 2.25 }))

  expect(runs[0]?.cpu).toBe(3.75)
})

test("a record naming no run id is read as belonging to no run", () => {
  const runs = runsIn(
    [lineOf({ phase: "patch", runId: null }), lineOf({ phase: "patch", runId: "" })].join("\n")
  )

  expect(runs.map((one) => one.runId)).toEqual([null, null])
})

test("a run that forgot no high-water mark is left out of memory but counted everywhere else", () => {
  const runs = runsIn(
    [
      lineOf({ phase: "patch", cpuSeconds: 9, peakAddedBytes: 999, peakMeasured: false }),
      lineOf({ phase: "patch", cpuSeconds: 2, peakAddedBytes: 100 }),
      lineOf({ phase: "patch", cpuSeconds: 1, peakAddedBytes: 200 }),
      lineOf({ phase: "patch", cpuSeconds: 4, peakAddedBytes: 900 }),
    ].join("\n")
  )
  const cost = costOf("one", runs)

  expect(cost.patchCpu).toBe(4)
  expect(cost.patchMem).toBe(400)
  expect(cost.patchRuns).toBe(4)
})

test("a run exactly the period's age is counted and a run a moment older is not", () => {
  const runs = runsIn(
    [
      lineOf({ phase: "patch", cpuSeconds: 6, ranAt: agoOf(DAY) }),
      lineOf({ phase: "patch", cpuSeconds: 60, ranAt: agoOf(DAY + 1) }),
    ].join("\n")
  )

  expect(withinOf(runs, NOW, DAY).map((one) => one.cpu)).toEqual([6])
})

test("a run stamped after the moment of asking is not counted", () => {
  const runs = runsIn(lineOf({ phase: "patch", cpuSeconds: 7, ranAt: agoOf(-HOUR) }))

  expect(withinOf(runs, NOW, DAY)).toEqual([])
})

test("a run whose time cannot be read is not counted", () => {
  const runs = runsIn(lineOf({ phase: "patch", cpuSeconds: 7, ranAt: "the other day" }))

  expect(withinOf(runs, NOW, DAY)).toEqual([])
})

test("a run older than the period counts towards no average, at the edge or far outside", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, ranAt: agoOf(HOUR) },
      { phase: "patch", cpuSeconds: 4, ranAt: agoOf(23 * HOUR) },
      { phase: "patch", cpuSeconds: 100, ranAt: agoOf(DAY + 1) },
      { phase: "patch", cpuSeconds: 1000, ranAt: agoOf(30 * DAY) },
    ],
  })
  const cost = costsIn(root, NOW, DAY_BACK).checks[0]

  expect(cost?.patchRuns).toBe(2)
  expect(cost?.patchCpu).toBe(3)
})

test("a check holding no run the choice reached is not answered", () => {
  const root = rootWith({
    fresh: [{ phase: "patch", cpuSeconds: 1, ranAt: agoOf(HOUR) }],
    stale: [
      { phase: "patch", cpuSeconds: 9, ranAt: agoOf(DAY + 1) },
      { phase: "audit", cpuSeconds: 9, ranAt: agoOf(30 * DAY) },
    ],
  })

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual(["fresh"])
})

test("a call handing over no argument reads the last one run", () => {
  expect(chosenIn([])).toEqual({ chosen: ONE_RUN, refusals: [] })
})

test("a count names how many of the newest runs are read", () => {
  expect(chosenIn(["--last", "5"]).chosen).toEqual({ by: "runs", runs: 5 })
})

test("a period is named in minutes or hours or days", () => {
  expect(chosenIn(["--last", "30m"]).chosen).toEqual({ by: "period", ms: 1800000, said: "30m" })
  expect(chosenIn(["--last", "2h"]).chosen).toEqual({ by: "period", ms: 7200000, said: "2h" })
  expect(chosenIn(["--last", "7d"]).chosen).toEqual({ by: "period", ms: 604800000, said: "7d" })
})

test("a count of no runs is refused", () => {
  const chose = chosenIn(["--last", "0"])

  expect(chose.chosen).toBe(null)
  expect(chose.refusals[0]).toContain("`--last <count>`")
})

test("a flag nothing follows is refused", () => {
  const chose = chosenIn(["--last"])

  expect(chose.chosen).toBe(null)
  expect(chose.refusals[0]).toContain("`--last <count>{m|h|d}`")
})

test("an argument this command does not take is refused", () => {
  expect(chosenIn(["--since"]).chosen).toBe(null)
  expect(chosenIn(["yesterday"]).chosen).toBe(null)
  expect(chosenIn(["--last", "5", "--last", "6"]).chosen).toBe(null)
  expect(chosenIn(["--last", "3w"]).chosen).toBe(null)
  expect(chosenIn(["--last", "0h"]).chosen).toBe(null)
})

test("runs are ranked by the latest moment any record of that run carries", () => {
  const runs = runsIn(
    [
      lineOf({ phase: "patch", runId: ONE, ranAt: agoOf(3 * HOUR) }),
      lineOf({ phase: "patch", runId: ONE, ranAt: agoOf(HOUR) }),
      lineOf({ phase: "patch", runId: TWO, ranAt: agoOf(2 * HOUR) }),
      lineOf({ phase: "patch", runId: THREE, ranAt: agoOf(4 * HOUR) }),
    ].join("\n")
  )

  expect([...rankedOf(latestOf(runs), 2)]).toEqual([ONE, TWO])
})

test("a record carrying no run id is counted nowhere where runs were counted", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, runId: ONE },
      { phase: "patch", cpuSeconds: 100, runId: null },
    ],
  })
  const costs = costsIn(root, NOW, ONE_RUN)

  expect(costs.checks[0]?.patchRuns).toBe(1)
  expect(costs.checks[0]?.patchCpu).toBe(2)
  expect(costs.idless).toBe(1)
})

test("a record carrying no run id is counted where a period was named", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, runId: null },
      { phase: "patch", cpuSeconds: 4, runId: null },
    ],
  })
  const costs = costsIn(root, NOW, DAY_BACK)

  expect(costs.checks[0]?.patchRuns).toBe(2)
  expect(costs.checks[0]?.patchCpu).toBe(3)
  expect(costs.idless).toBe(0)
})

test("how many records carry no run id is said beneath the table", () => {
  const root = rootWith({
    one: [
      { phase: "patch", runId: ONE },
      { phase: "patch", runId: null },
    ],
  })

  expect(linesOf(costsIn(root, NOW, ONE_RUN))).toContain(
    "1 record carries no run id, and what carries none belongs to no run"
  )
})

test("only the runs chosen are counted where a count was named", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, runId: ONE, ranAt: agoOf(HOUR) },
      { phase: "patch", cpuSeconds: 4, runId: TWO, ranAt: agoOf(2 * HOUR) },
      { phase: "patch", cpuSeconds: 8, runId: THREE, ranAt: agoOf(3 * HOUR) },
    ],
  })

  expect(costsIn(root, NOW, ONE_RUN).checks[0]?.patchCpu).toBe(2)
  expect(costsIn(root, NOW, { by: "runs", runs: 2 }).checks[0]?.patchRuns).toBe(2)
  expect(costsIn(root, NOW, { by: "runs", runs: 9 }).checks[0]?.patchRuns).toBe(3)
})

test("one run's runs are the runs of every check that run judged", () => {
  const root = rootWith({
    one: [{ phase: "patch", cpuSeconds: 2, runId: TWO, ranAt: agoOf(HOUR) }],
    two: [{ phase: "patch", cpuSeconds: 3, runId: TWO, ranAt: agoOf(HOUR) }],
    three: [{ phase: "patch", cpuSeconds: 90, runId: ONE, ranAt: agoOf(9 * HOUR) }],
  })
  const costs = costsIn(root, NOW, ONE_RUN)

  expect(costs.checks.map((one) => one.check)).toEqual(["two", "one"])
  expect(costs.total).toEqual({ patchRuns: 1, patchCpu: 5, auditRuns: 0, auditCpu: null })
})

test("the total shares a phase's processor time over the distinct runs of that phase", () => {
  const runs = runsIn(
    [
      lineOf({ phase: "patch", runId: ONE, cpuSeconds: 3 }),
      lineOf({ phase: "patch", runId: ONE, cpuSeconds: 5 }),
      lineOf({ phase: "patch", runId: TWO, cpuSeconds: 2 }),
      lineOf({ phase: "audit", runId: THREE, cpuSeconds: 9 }),
    ].join("\n")
  )

  expect(totalOf(runs)).toEqual({ patchRuns: 2, patchCpu: 5, auditRuns: 1, auditCpu: 9 })
})

test("a phase holding no run totals no processor time rather than a time of zero", () => {
  expect(totalOf(runsIn(lineOf({ phase: "patch", runId: ONE })))).toEqual({
    patchRuns: 1,
    patchCpu: 0,
    auditRuns: 0,
    auditCpu: null,
  })
})

test("the total sits beneath the table with its memory drawn absent", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 2 })))
  const said = linesOf({
    checks: [cost],
    total: { patchRuns: 1, patchCpu: 2, auditRuns: 0, auditCpu: null },
    footer: "the last run",
    idless: 0,
    unread: [],
    other: [],
  })

  expect(spacedOnce(said[2])).toBe("")
  expect(spacedOnce(said[3])).toBe("total 1 2.000s - 0 - -")
  expect(said).toContain("memory is left out of the total, because peaks do not add")
})

test("the one run chosen is named beneath the table with the moment that run ran", () => {
  const runs = runsIn(lineOf({ phase: "patch", runId: ONE, ranAt: agoOf(HOUR) }))

  expect(footerOf(ONE_RUN, runs)).toBe(`the last run \`${ONE}\` ran at ${agoOf(HOUR)}`)
})

test("how many runs were chosen is said where more than one was chosen", () => {
  const runs = runsIn(
    [lineOf({ runId: ONE }), lineOf({ runId: TWO }), lineOf({ runId: THREE })].join("\n")
  )

  expect(footerOf({ by: "runs", runs: 5 }, runs)).toBe("the last 3 runs")
})

test("the period chosen is said beneath the table", () => {
  expect(footerOf({ by: "period", ms: 7200000, said: "2h" }, [])).toBe("over the last 2h")
})

test("a choice of runs reaching no run says so beneath the table", () => {
  expect(footerOf(ONE_RUN, [])).toBe("no run carrying a run id was found")
})

test("how many runs a phase holds is counted beside that phase's averages", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 1 },
      { phase: "patch", cpuSeconds: 3 },
      { phase: "patch", cpuSeconds: 8 },
      { phase: "audit", cpuSeconds: 8 },
      { phase: "worktree", cpuSeconds: 9 },
    ],
  })
  const cost = costsIn(root, NOW, DAY_BACK).checks[0]

  expect(cost?.patchRuns).toBe(3)
  expect(cost?.patchCpu).toBe(4)
  expect(cost?.auditRuns).toBe(1)
  expect(cost?.auditCpu).toBe(8)
})

test("a phase no run was judged at carries no average rather than an average of zero", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 0 })))

  expect(cost.patchCpu).toBe(0)
  expect(cost.auditCpu).toBe(null)
  const said = linesOf(costsOf([cost]))[1] ?? ""

  expect(said).toContain("0.000s")
  expect(said.endsWith("-")).toBe(true)
})

test("a phase no run was judged at counts zero runs rather than drawing them absent", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 0 })))

  expect(cost.auditRuns).toBe(0)
  const said = linesOf(costsOf([cost]))

  expect(spacedOnce(said[0])).toBe(
    "check patch runs patch cpu patch mem full runs full cpu full mem"
  )
  expect(spacedOnce(said[1])).toBe("one 1 0.000s 0 B 0 - -")
})

test("checks are ordered by what their patch runs took, and no patch run comes last", () => {
  const root = rootWith({
    fast: [{ phase: "patch", cpuSeconds: 1 }],
    slow: [{ phase: "patch", cpuSeconds: 9 }],
    "audit-only": [{ phase: "audit", cpuSeconds: 50 }],
    "b-tie": [{ phase: "patch", cpuSeconds: 1 }],
    skewed: [
      { phase: "patch", cpuSeconds: 1 },
      { phase: "patch", cpuSeconds: 1 },
      { phase: "patch", cpuSeconds: 10 },
    ],
  })

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual([
    "slow",
    "skewed",
    "b-tie",
    "fast",
    "audit-only",
  ])
})

test("a patch run and an audit run are split apart", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, peakAddedBytes: 2048 },
      { phase: "audit", cpuSeconds: 8, peakAddedBytes: 1048576 },
    ],
  })
  const cost = costsIn(root, NOW, DAY_BACK).checks[0]

  expect(cost?.patchRuns).toBe(1)
  expect(cost?.patchCpu).toBe(2)
  expect(cost?.patchMem).toBe(2048)
  expect(cost?.auditRuns).toBe(1)
  expect(cost?.auditCpu).toBe(8)
  expect(cost?.auditMem).toBe(1048576)
})

test("a run naming a phase this does not split by is counted beneath the table", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 1 },
      { phase: "worktree", cpuSeconds: 3 },
      { phase: "deploy", cpuSeconds: 4 },
      { phase: "worktree", cpuSeconds: 5 },
      { phase: "worktree", cpuSeconds: 5, ranAt: agoOf(30 * DAY) },
    ],
  })
  const costs = costsIn(root, NOW, DAY_BACK)

  expect(costs.checks[0]?.patchRuns).toBe(1)
  expect(costs.checks[0]?.patchCpu).toBe(1)
  expect(costs.other).toEqual(["worktree: 2", "deploy: 1"])
  expect(linesOf(costs)).toContain("these runs name a phase this does not split by:")
})

test("entries that could not be read are named beneath the table", () => {
  const root = rootWith({ one: [{ phase: "patch", cpuSeconds: 1 }] })
  put(root, "checks/code-checks/pages/bad/bad.code-check.entries.uncommitted.jsonl", "{not json\n")
  const costs = costsIn(root, NOW, DAY_BACK)

  expect(costs.checks.map((one) => one.check)).toEqual(["one"])
  expect(costs.unread).toEqual([
    "checks/code-checks/pages/bad/bad.code-check.entries.uncommitted.jsonl",
  ])
})

test("memory is scaled to the unit that fits and processor time runs to three decimals", () => {
  expect(bytesAs(0)).toBe("0 B")
  expect(bytesAs(8192)).toBe("8.0 KiB")
  expect(bytesAs(29546496)).toBe("28.2 MiB")
  expect(bytesAs(4559089664)).toBe("4.2 GiB")
  expect(secondsAs(3.939)).toBe("3.939s")
})

test("a count of bytes is rounded to the whole byte before it is scaled", () => {
  expect(bytesAs(512.4)).toBe("512 B")
  expect(bytesAs(1023.6)).toBe("1.0 KiB")
})

test("a root holding no checks answers no check rather than throwing", () => {
  expect(costsIn(scratch.rootFor("check-measuring-empty-"), NOW, ONE_RUN)).toEqual({
    checks: [],
    total: { patchRuns: 0, patchCpu: null, auditRuns: 0, auditCpu: null },
    footer: "no run carrying a run id was found",
    idless: 0,
    unread: [],
    other: [],
  })
})
