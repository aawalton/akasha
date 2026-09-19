import {
  type CheckCost,
  type Chosen,
  type Costs,
  type Run,
  runsRead,
  type Total,
} from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

export const ENTRIES = "entries"

const LOGS = "check.logs"

export const AUDIT_LOGS = "audit.logs"

const CHECKED = "check-code"

const UNDER = "check/code/pages"

const NOT_JSON = "{not json\n"

const UNREADABLE = 99

const TORN = 98

const CEILINGED = 97

const FIRST_PART = 1

export const NOW = Date.parse("2026-09-05T12:00:00.000Z")

export const HOUR = 3600000

export const DAY = 24 * HOUR

export const ONE = "01a08071-39a4-7000-9c6b-6cee59d30b10"

export const TWO = "01a08071-39a4-7000-9c6b-6cee59d30b20"

export const THREE = "01a08071-39a4-7000-9c6b-6cee59d30b30"

export const DAY_BACK: Chosen = { by: "period", ms: DAY, said: "24h" }

export const LAST_RUN: Chosen = { by: "runs", runs: 1 }

export const TORN_SAID = "these held a row that would not read, and that row counts no run:"

export const scratch = scratchWorld()

export function agoOf(ms: number): string {
  return new Date(NOW - ms).toISOString()
}

export function sinceNow(ms: number): string {
  return new Date(Date.now() - ms).toISOString()
}

export function lineOf(one: Record<string, unknown>): string {
  return JSON.stringify({
    runId: ONE,
    ranAt: agoOf(HOUR),
    wallMs: 0,
    cpuSeconds: 0,
    childCpuSeconds: 0,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 0,
    peakMeasured: true,
    pathsChanged: 1,
    refusals: 0,
    ...one,
  })
}

export const NO_TOTAL: Total = {
  runs: 0,
  cpu: null,
  cpuMost: null,
  wall: null,
  wallMost: null,
  memMost: null,
  cpuMid: null,
  wallMid: null,
}

export const ZERO_TOTAL: Total = {
  runs: 1,
  cpu: 0,
  cpuMost: 0,
  wall: 0,
  wallMost: 0,
  memMost: 0,
  cpuMid: 0,
  wallMid: 0,
}

export const JUDGED_TOTAL: Total = {
  runs: 1,
  cpu: 5,
  cpuMost: 5,
  wall: 0,
  wallMost: 0,
  memMost: 0,
  cpuMid: 5,
  wallMid: 0,
}

export const DRAWN_TOTAL: Total = {
  runs: 1,
  cpu: 2,
  cpuMost: 3,
  wall: 4,
  wallMost: 5,
  memMost: 2048,
  cpuMid: 6,
  wallMid: 7,
}

export function runsOf(rows: readonly Record<string, unknown>[]): readonly Run[] {
  return runsRead(rows.map(lineOf).join("\n")).runs
}

export function partAt(check: string, part: number, under: string = LOGS): string {
  const named = part === FIRST_PART ? under : `${under}.part${part}`
  return `${UNDER}/${check}/${check}.${CHECKED}.${named}.uncommitted.jsonl`
}

function idOf(at: number): string {
  return `01a08071-39a4-7000-9c6b-${String(at).padStart(12, "0")}`
}

function checkFiled(
  root: string,
  check: string,
  at: number,
  held: Record<string, unknown> = {}
): undefined {
  const path = `${UNDER}/${check}/${check}.${CHECKED}.ts`
  listedFiled(root, CHECKED, check, [{ path, id: idOf(at) }])
  valueAlsoFiled(root, CHECKED, [
    { path, value: { id: idOf(at), pageTypeSlug: CHECKED, slug: check, ...held } },
  ])
}

export function rowsInto(
  root: string,
  held: Record<string, readonly Record<string, unknown>[]>,
  part = FIRST_PART,
  under: string = LOGS
): string {
  nothingFiled(root)
  for (const [at, [check, rows]] of Object.entries(held).entries()) {
    if (part === FIRST_PART) checkFiled(root, check, at)
    put(root, partAt(check, part, under), `${rows.map(lineOf).join("\n")}\n`)
  }
  return root
}

export function rootWith(held: Record<string, readonly Record<string, unknown>[]>): string {
  return rowsInto(scratch.rootFor("check-measuring-"), held)
}

function rootCeilinged(
  held: Record<string, readonly Record<string, unknown>[]>,
  ceilings: Record<string, Record<string, unknown>>
): string {
  const root = scratch.rootFor("check-measuring-")
  nothingFiled(root)
  for (const [check, value] of Object.entries(ceilings)) checkFiled(root, check, CEILINGED, value)
  return rowsInto(root, held)
}

export function rootLimited(): string {
  return rootCeilinged(
    { one: [{ phase: "change", cpuSeconds: 2 }], two: [{ phase: "change", cpuSeconds: 1 }] },
    { one: { check: { maxCpuSeconds: 10, maxWallSeconds: 20, maxMemoryMb: 512 } } }
  )
}

export function rootGrouped(): string {
  const root = rootCeilinged(
    { one: [{ phase: "change", cpuSeconds: 1 }] },
    { one: { check: { maxCpuSeconds: 10 }, audit: { maxCpuSeconds: 15 } } }
  )
  return rowsBeside(root, { one: [{ phase: "audit", cpuSeconds: 1 }] }, AUDIT_LOGS)
}

export function rootAged(): string {
  return rootWith({
    one: [
      { phase: "change", cpuSeconds: 2, ranAt: agoOf(HOUR) },
      { phase: "change", cpuSeconds: 4, ranAt: agoOf(23 * HOUR) },
      { phase: "change", cpuSeconds: 100, ranAt: agoOf(DAY + 1) },
      { phase: "change", cpuSeconds: 1000, ranAt: agoOf(30 * DAY) },
    ],
  })
}

export function rootJudged(): string {
  return rootWith({
    one: [{ phase: "change", cpuSeconds: 2, runId: TWO, ranAt: agoOf(HOUR) }],
    two: [{ phase: "change", cpuSeconds: 3, runId: TWO, ranAt: agoOf(HOUR) }],
    three: [{ phase: "change", cpuSeconds: 90, runId: ONE, ranAt: agoOf(9 * HOUR) }],
  })
}

export function rootStale(): string {
  return rootWith({
    fresh: [{ phase: "change", cpuSeconds: 1, ranAt: agoOf(HOUR) }],
    stale: [
      { phase: "change", cpuSeconds: 9, ranAt: agoOf(DAY + 1) },
      { phase: "deploy", cpuSeconds: 9, ranAt: agoOf(30 * DAY) },
    ],
  })
}

export function rootLoose(): string {
  return rootWith({
    one: [
      { phase: "change", cpuSeconds: 2, runId: ONE },
      { phase: "change", cpuSeconds: 100, runId: null },
    ],
  })
}

export function rootUnrun(): string {
  return rootWith({
    one: [
      { phase: "change", cpuSeconds: 2, runId: null },
      { phase: "change", cpuSeconds: 4, runId: null },
    ],
  })
}

export function rootThrice(): string {
  return rootWith({
    one: [
      { phase: "change", cpuSeconds: 1 },
      { phase: "change", cpuSeconds: 3 },
      { phase: "change", cpuSeconds: 8 },
    ],
  })
}

export function rootDeployed(): string {
  return rootWith({
    one: [
      { phase: "change", cpuSeconds: 1 },
      { phase: "deploy", cpuSeconds: 8 },
    ],
  })
}

export function rootChosen(): string {
  return rootWith({
    one: [
      { phase: "change", cpuSeconds: 2, runId: ONE, ranAt: agoOf(HOUR) },
      { phase: "change", cpuSeconds: 4, runId: TWO, ranAt: agoOf(2 * HOUR) },
      { phase: "change", cpuSeconds: 8, runId: THREE, ranAt: agoOf(3 * HOUR) },
    ],
  })
}

export function rowsBeside(
  root: string,
  held: Record<string, readonly Record<string, unknown>[]>,
  under: string
): string {
  for (const [check, rows] of Object.entries(held)) {
    put(root, partAt(check, FIRST_PART, under), `${rows.map(lineOf).join("\n")}\n`)
  }
  return root
}

export function rootOrdered(): string {
  const root = rootWith({
    fast: [{ phase: "change", cpuSeconds: 1 }],
    slow: [{ phase: "change", cpuSeconds: 9 }],
    "audit-only": [],
    "b-tie": [{ phase: "change", cpuSeconds: 1 }],
    skewed: [
      { phase: "change", cpuSeconds: 1 },
      { phase: "change", cpuSeconds: 1 },
      { phase: "change", cpuSeconds: 10 },
    ],
  })
  return rowsBeside(root, { "audit-only": [{ phase: "audit", cpuSeconds: 50 }] }, AUDIT_LOGS)
}

export function unreadableInto(root: string, check: string): string {
  checkFiled(root, check, UNREADABLE)
  put(root, `${partAt(check, FIRST_PART)}/inner`, "")
  return root
}

export function tornInto(root: string, check: string): string {
  const rows = [lineOf({ phase: "change", cpuSeconds: 4 }), NOT_JSON].join("\n")
  checkFiled(root, check, TORN)
  put(root, partAt(check, FIRST_PART), rows)
  return root
}

export function costsOf(checks: readonly CheckCost[]): Costs {
  return { checks, total: NO_TOTAL, unread: [], torn: [] }
}

export function spacedOnce(said: string | undefined): string {
  return (said ?? "").replace(/\s+/g, " ")
}
