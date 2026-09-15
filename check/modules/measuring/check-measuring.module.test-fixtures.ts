import type {
  CheckCost,
  Chosen,
  Costs,
} from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { scratchWorld } from "akasha/util/fs/modules/scratching/scratching.module.code.ts"

export const ENTRIES = "entries"

const LOGS = "check.logs"

export const AUDIT_LOGS = "audit.logs"

const CHECKED = "check-code"

const UNDER = "check/code/pages"

const NOT_JSON = "{not json\n"

const UNREADABLE = 99

const TORN = 98

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

export function partAt(check: string, part: number, under: string = LOGS): string {
  const named = part === FIRST_PART ? under : `${under}.part${part}`
  return `${UNDER}/${check}/${check}.${CHECKED}.${named}.uncommitted.jsonl`
}

function idOf(at: number): string {
  return `01a08071-39a4-7000-9c6b-${String(at).padStart(12, "0")}`
}

function checkFiled(root: string, check: string, at: number): undefined {
  const path = `${UNDER}/${check}/${check}.${CHECKED}.ts`
  listedFiled(root, CHECKED, check, [{ path, id: idOf(at) }])
  valueAlsoFiled(root, CHECKED, [
    { path, value: { id: idOf(at), pageTypeSlug: CHECKED, slug: check } },
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
  return { checks, total: { runs: 0, cpu: null, paths: 0, refusals: 0 }, unread: [], torn: [] }
}

export function spacedOnce(said: string | undefined): string {
  return (said ?? "").replace(/\s+/g, " ")
}
