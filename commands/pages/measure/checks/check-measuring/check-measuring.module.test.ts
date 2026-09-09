import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../../modules/scratching/scratching.module.code.ts"
import {
  bytesAs,
  chosenIn,
  costOf,
  costsIn,
  heldIn,
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
  unreadableInto,
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

  expect(cost.cpu).toBe(4)
  expect(cost.mem).toBe(400)
  expect(cost.runs).toBe(4)
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

  expect(cost?.runs).toBe(2)
  expect(cost?.cpu).toBe(3)
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

test("a call handing over no argument reads the last one run of the patch phase", () => {
  expect(chosenIn([])).toEqual({ chosen: ONE_RUN, phase: "patch", refusals: [] })
})

test("the audit flag reads the audit runs in place of the patch runs", () => {
  expect(chosenIn(["--audit"])).toEqual({ chosen: ONE_RUN, phase: "audit", refusals: [] })
  expect(chosenIn(["--audit", "--last", "5"]).phase).toBe("audit")
  expect(chosenIn(["--last", "5", "--audit"]).chosen).toEqual({ by: "runs", runs: 5 })
})

test("the audit flag said twice is refused", () => {
  expect(chosenIn(["--audit", "--audit"]).chosen).toBe(null)
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

  expect(costs.checks[0]?.runs).toBe(1)
  expect(costs.checks[0]?.cpu).toBe(2)
})

test("a record carrying no run id is counted where a period was named", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, runId: null },
      { phase: "patch", cpuSeconds: 4, runId: null },
    ],
  })
  const costs = costsIn(root, NOW, DAY_BACK)

  expect(costs.checks[0]?.runs).toBe(2)
  expect(costs.checks[0]?.cpu).toBe(3)
})

test("only the runs chosen are counted where a count was named", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, runId: ONE, ranAt: agoOf(HOUR) },
      { phase: "patch", cpuSeconds: 4, runId: TWO, ranAt: agoOf(2 * HOUR) },
      { phase: "patch", cpuSeconds: 8, runId: THREE, ranAt: agoOf(3 * HOUR) },
    ],
  })

  expect(costsIn(root, NOW, ONE_RUN).checks[0]?.cpu).toBe(2)
  expect(costsIn(root, NOW, { by: "runs", runs: 2 }).checks[0]?.runs).toBe(2)
  expect(costsIn(root, NOW, { by: "runs", runs: 9 }).checks[0]?.runs).toBe(3)
})

test("one run's runs are the runs of every check that run judged", () => {
  const root = rootWith({
    one: [{ phase: "patch", cpuSeconds: 2, runId: TWO, ranAt: agoOf(HOUR) }],
    two: [{ phase: "patch", cpuSeconds: 3, runId: TWO, ranAt: agoOf(HOUR) }],
    three: [{ phase: "patch", cpuSeconds: 90, runId: ONE, ranAt: agoOf(9 * HOUR) }],
  })
  const costs = costsIn(root, NOW, ONE_RUN)

  expect(costs.checks.map((one) => one.check)).toEqual(["two", "one"])
  expect(costs.total).toEqual({ runs: 1, cpu: 5, paths: 1, refusals: 0 })
})

test("the total shares the processor time over the distinct runs read", () => {
  const runs = runsIn(
    [
      lineOf({ phase: "patch", runId: ONE, cpuSeconds: 3 }),
      lineOf({ phase: "patch", runId: ONE, cpuSeconds: 5 }),
      lineOf({ phase: "patch", runId: TWO, cpuSeconds: 2 }),
    ].join("\n")
  )

  expect(totalOf(runs)).toEqual({ runs: 2, cpu: 5, paths: 2, refusals: 0 })
})

test("no run at all totals no processor time rather than a time of zero", () => {
  expect(totalOf(runsIn(lineOf({ phase: "patch", runId: ONE })))).toEqual({
    runs: 1,
    cpu: 0,
    paths: 1,
    refusals: 0,
  })
  expect(totalOf([])).toEqual({ runs: 0, cpu: null, paths: 0, refusals: 0 })
})

test("the total sits beneath the table with its memory drawn absent", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 2 })))
  const said = linesOf({
    checks: [cost],
    total: { runs: 1, cpu: 2, paths: 1, refusals: 0 },
    unread: [],
    other: [],
  })

  expect(spacedOnce(said[2])).toBe("")
  expect(spacedOnce(said[3])).toBe("total 1 2.000s - 1 0")
})

test("how many runs a check holds is counted beside its averages", () => {
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

  expect(cost?.runs).toBe(3)
  expect(cost?.cpu).toBe(4)
})

test("a check no run was judged at carries no average rather than an average of zero", () => {
  const cost = costOf("one", [])

  expect(cost.runs).toBe(0)
  expect(cost.cpu).toBe(null)
  expect(cost.mem).toBe(null)
  const said = linesOf(costsOf([cost]))[1] ?? ""

  expect(spacedOnce(said)).toBe("one 0 - - 0 0")
})

test("the table carries one set of columns for the phase read", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 0 })))
  const said = linesOf(costsOf([cost]))

  expect(spacedOnce(said[0])).toBe("check runs cpu mem paths refusals")
  expect(spacedOnce(said[1])).toBe("one 1 0.000s 0 B 1 0")
})

test("checks are ordered by what their runs took, and equal times by name", () => {
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
  ])
})

test("the patch runs are read by default and the audit runs where audit was named", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, peakAddedBytes: 2048 },
      { phase: "audit", cpuSeconds: 8, peakAddedBytes: 1048576 },
    ],
  })
  const patch = costsIn(root, NOW, DAY_BACK).checks[0]
  const audit = costsIn(root, NOW, DAY_BACK, "audit").checks[0]

  expect(patch?.runs).toBe(1)
  expect(patch?.cpu).toBe(2)
  expect(patch?.mem).toBe(2048)
  expect(audit?.runs).toBe(1)
  expect(audit?.cpu).toBe(8)
  expect(audit?.mem).toBe(1048576)
})

test("a check holding no run of the phase read is not answered", () => {
  const root = rootWith({
    one: [{ phase: "patch", cpuSeconds: 2 }],
    two: [{ phase: "audit", cpuSeconds: 8 }],
  })

  expect(costsIn(root, NOW, DAY_BACK).checks.map((one) => one.check)).toEqual(["one"])
  expect(costsIn(root, NOW, DAY_BACK, "audit").checks.map((one) => one.check)).toEqual(["two"])
})

test("a run naming a phase this does not read is counted beneath the table", () => {
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

  expect(costs.checks[0]?.runs).toBe(1)
  expect(costs.checks[0]?.cpu).toBe(1)
  expect(costs.other).toEqual(["worktree: 2", "deploy: 1"])
  expect(linesOf(costs)).toContain("these runs name a phase this does not read:")
})

test("every numbered file of a check's entries is read in order rather than the first alone", () => {
  const root = rootWith({ one: [{ phase: "patch", cpuSeconds: 2, runId: ONE }] })
  rowsInto(root, { one: [{ phase: "patch", cpuSeconds: 4, runId: TWO }] }, 2)
  rowsInto(root, { one: [{ phase: "patch", cpuSeconds: 6, runId: THREE }] }, 3)
  const cost = costsIn(root, NOW, DAY_BACK).checks[0]

  expect(heldIn(root).held[0]?.runs.map((one) => one.cpu)).toEqual([2, 4, 6])
  expect(cost?.runs).toBe(3)
  expect(cost?.cpu).toBe(4)
})

test("entries that could not be read are named beneath the table", () => {
  const root = unreadableInto(rootWith({ one: [{ phase: "patch", cpuSeconds: 1 }] }), "bad")
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
  const root = rowsInto(scratch.rootFor("check-measuring-empty-"), {})

  expect(costsIn(root, NOW, ONE_RUN)).toEqual({
    checks: [],
    total: { runs: 0, cpu: null, paths: 0, refusals: 0 },
    unread: [],
    other: [],
  })
})
