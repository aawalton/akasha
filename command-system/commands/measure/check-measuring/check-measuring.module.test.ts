import { afterAll, expect, test } from "bun:test"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import {
  bytesAs,
  costOf,
  costsIn,
  linesOf,
  medianOf,
  runsIn,
  secondsAs,
} from "./check-measuring.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function lineOf(one: Record<string, unknown>): string {
  return JSON.stringify({
    ranAt: "2026-09-05T00:00:00.000Z",
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

test("a median of an even count of runs is the mean of the two middle runs", () => {
  expect(medianOf([1, 2, 3])).toBe(2)
  expect(medianOf([1, 2, 3, 4])).toBe(2.5)
  expect(medianOf([])).toBe(null)
})

test("a run's processor time is its own together with the children it reaped", () => {
  const runs = runsIn(lineOf({ phase: "patch", cpuSeconds: 1.5, childCpuSeconds: 2.25 }))

  expect(runs[0]?.cpu).toBe(3.75)
})

test("a run that forgot no high-water mark is left out of memory but kept in processor time", () => {
  const runs = runsIn(
    [
      lineOf({ phase: "patch", cpuSeconds: 4, peakAddedBytes: 999, peakMeasured: false }),
      lineOf({ phase: "patch", cpuSeconds: 2, peakAddedBytes: 100 }),
    ].join("\n")
  )
  const cost = costOf("one", runs)

  expect(cost.patchCpu).toBe(3)
  expect(cost.patchMem).toBe(100)
})

test("a phase no run was judged at carries no median rather than a median of zero", () => {
  const cost = costOf("one", runsIn(lineOf({ phase: "patch", cpuSeconds: 0 })))

  expect(cost.patchCpu).toBe(0)
  expect(cost.auditCpu).toBe(null)
  const said = linesOf({ checks: [cost], unread: [], other: [] })[1] ?? ""

  expect(said).toContain("0.000s")
  expect(said.endsWith("-")).toBe(true)
})

test("checks are ordered by what their patch runs took, and no patch run comes last", () => {
  const root = rootWith({
    fast: [{ phase: "patch", cpuSeconds: 1 }],
    slow: [{ phase: "patch", cpuSeconds: 9 }],
    "audit-only": [{ phase: "audit", cpuSeconds: 50 }],
    "b-tie": [{ phase: "patch", cpuSeconds: 1 }],
  })

  expect(costsIn(root).checks.map((one) => one.check)).toEqual([
    "slow",
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
  const cost = costsIn(root).checks[0]

  expect(cost?.patchCpu).toBe(2)
  expect(cost?.patchMem).toBe(2048)
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
    ],
  })
  const costs = costsIn(root)

  expect(costs.checks[0]?.patchCpu).toBe(1)
  expect(costs.other).toEqual(["worktree: 2", "deploy: 1"])
  expect(linesOf(costs)).toContain("these runs name a phase this does not split by:")
})

test("entries that could not be read are named beneath the table", () => {
  const root = rootWith({ one: [{ phase: "patch", cpuSeconds: 1 }] })
  put(root, "checks/code-checks/pages/bad/bad.code-check.entries.uncommitted.jsonl", "{not json\n")
  const costs = costsIn(root)

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

test("a root holding no checks answers no check rather than throwing", () => {
  expect(costsIn(scratch.rootFor("check-measuring-empty-"))).toEqual({
    checks: [],
    unread: [],
    other: [],
  })
})
