import { afterAll, expect, test } from "bun:test"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import {
  bytesAs,
  costOf,
  costsIn,
  linesOf,
  meanOf,
  runsIn,
  secondsAs,
  withinOf,
} from "./check-measuring.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const NOW = Date.parse("2026-09-05T12:00:00.000Z")

const HOUR = 3600000

const DAY = 24 * HOUR

function agoOf(ms: number): string {
  return new Date(NOW - ms).toISOString()
}

function lineOf(one: Record<string, unknown>): string {
  return JSON.stringify({
    ranAt: agoOf(HOUR),
    wallMs: 0,
    cpuSeconds: 0,
    childCpuSeconds: 0,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 0,
    peakMeasured: true,
    pathsJudged: 1,
    refusals: 0,
    ...one,
  })
}

function rootWith(held: Record<string, readonly Record<string, unknown>[]>): string {
  const root = scratch.rootFor("check-measuring-")
  for (const [check, rows] of Object.entries(held)) {
    put(
      root,
      `checks/code-checks/pages/${check}/${check}.code-check.entries.uncommitted.jsonl`,
      `${rows.map(lineOf).join("\n")}\n`
    )
  }
  return root
}

function spacedOnce(said: string | undefined): string {
  return (said ?? "").replace(/\s+/g, " ")
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

test("a run exactly the window's age is counted and a run a moment older is not", () => {
  const runs = runsIn(
    [
      lineOf({ phase: "patch", cpuSeconds: 6, ranAt: agoOf(DAY) }),
      lineOf({ phase: "patch", cpuSeconds: 60, ranAt: agoOf(DAY + 1) }),
    ].join("\n")
  )

  expect(withinOf(runs, NOW).map((one) => one.cpu)).toEqual([6])
})

test("a run stamped after the moment of asking is not counted", () => {
  const runs = runsIn(lineOf({ phase: "patch", cpuSeconds: 7, ranAt: agoOf(-HOUR) }))

  expect(withinOf(runs, NOW)).toEqual([])
})

test("a run whose time cannot be read is not counted", () => {
  const runs = runsIn(lineOf({ phase: "patch", cpuSeconds: 7, ranAt: "the other day" }))

  expect(withinOf(runs, NOW)).toEqual([])
})

test("a run older than the window counts towards no average, at the edge or far outside", () => {
  const root = rootWith({
    one: [
      { phase: "patch", cpuSeconds: 2, ranAt: agoOf(HOUR) },
      { phase: "patch", cpuSeconds: 4, ranAt: agoOf(23 * HOUR) },
      { phase: "patch", cpuSeconds: 100, ranAt: agoOf(DAY + 1) },
      { phase: "patch", cpuSeconds: 1000, ranAt: agoOf(30 * DAY) },
    ],
  })
  const cost = costsIn(root, NOW).checks[0]

  expect(cost?.patchRuns).toBe(2)
  expect(cost?.patchCpu).toBe(3)
})

test("a check holding no run within the window is not answered", () => {
  const root = rootWith({
    fresh: [{ phase: "patch", cpuSeconds: 1, ranAt: agoOf(HOUR) }],
    stale: [
      { phase: "patch", cpuSeconds: 9, ranAt: agoOf(DAY + 1) },
      { phase: "audit", cpuSeconds: 9, ranAt: agoOf(30 * DAY) },
    ],
  })

  expect(costsIn(root, NOW).checks.map((one) => one.check)).toEqual(["fresh"])
})

test("the window the numbers cover is said with the table", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 1 })))

  expect(linesOf({ checks: [cost], unread: [], other: [] })[2]).toBe("over the last 24 hours")
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
  const cost = costsIn(root, NOW).checks[0]

  expect(cost?.patchRuns).toBe(3)
  expect(cost?.patchCpu).toBe(4)
  expect(cost?.auditRuns).toBe(1)
  expect(cost?.auditCpu).toBe(8)
})

test("a phase no run was judged at carries no average rather than an average of zero", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 0 })))

  expect(cost.patchCpu).toBe(0)
  expect(cost.auditCpu).toBe(null)
  const said = linesOf({ checks: [cost], unread: [], other: [] })[1] ?? ""

  expect(said).toContain("0.000s")
  expect(said.endsWith("-")).toBe(true)
})

test("a phase no run was judged at counts zero runs rather than drawing them absent", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 0 })))

  expect(cost.auditRuns).toBe(0)
  const said = linesOf({ checks: [cost], unread: [], other: [] })

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

  expect(costsIn(root, NOW).checks.map((one) => one.check)).toEqual([
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
  const cost = costsIn(root, NOW).checks[0]

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
  const costs = costsIn(root, NOW)

  expect(costs.checks[0]?.patchRuns).toBe(1)
  expect(costs.checks[0]?.patchCpu).toBe(1)
  expect(costs.other).toEqual(["worktree: 2", "deploy: 1"])
  expect(linesOf(costs)).toContain("these runs name a phase this does not split by:")
})

test("entries that could not be read are named beneath the table", () => {
  const root = rootWith({ one: [{ phase: "patch", cpuSeconds: 1 }] })
  put(root, "checks/code-checks/pages/bad/bad.code-check.entries.uncommitted.jsonl", "{not json\n")
  const costs = costsIn(root, NOW)

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
  expect(costsIn(scratch.rootFor("check-measuring-empty-"), NOW)).toEqual({
    checks: [],
    unread: [],
    other: [],
  })
})
