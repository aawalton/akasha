import { nothingFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import type { CheckCost, Chosen, Costs } from "./check-measuring.module.code.ts"

const ENTRIES = "entries"

const CHECKED = "code-check"

const UNDER = "checks/code-checks/pages"

const NOT_JSON = "{not json\n"

const UNREADABLE = 99

const FIRST_PART = 1

export const NOW = Date.parse("2026-09-05T12:00:00.000Z")

export const HOUR = 3600000

export const DAY = 24 * HOUR

export const ONE = "01a08071-39a4-7000-9c6b-6cee59d30b10"

export const TWO = "01a08071-39a4-7000-9c6b-6cee59d30b20"

export const THREE = "01a08071-39a4-7000-9c6b-6cee59d30b30"

export const DAY_BACK: Chosen = { by: "period", ms: DAY, said: "24h" }

export function agoOf(ms: number): string {
  return new Date(NOW - ms).toISOString()
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

export function partAt(check: string, part: number): string {
  const named = part === FIRST_PART ? ENTRIES : `${ENTRIES}.part${part}`
  return `${UNDER}/${check}/${check}.${CHECKED}.${named}.uncommitted.jsonl`
}

function idOf(at: number): string {
  return `01a08071-39a4-7000-9c6b-${String(at).padStart(12, "0")}`
}

function checkFiled(root: string, check: string, at: number): undefined {
  const path = `${UNDER}/${check}/${check}.${CHECKED}.ts`
  valueAlsoFiled(root, CHECKED, [
    { path, value: { id: idOf(at), pageTypeSlug: CHECKED, slug: check } },
  ])
}

export function rowsInto(
  root: string,
  held: Record<string, readonly Record<string, unknown>[]>,
  part = FIRST_PART
): string {
  nothingFiled(root)
  for (const [at, [check, rows]] of Object.entries(held).entries()) {
    if (part === FIRST_PART) checkFiled(root, check, at)
    put(root, partAt(check, part), `${rows.map(lineOf).join("\n")}\n`)
  }
  return root
}

export function unreadableInto(root: string, check: string): string {
  checkFiled(root, check, UNREADABLE)
  put(root, partAt(check, FIRST_PART), NOT_JSON)
  return root
}

export function costsOf(checks: readonly CheckCost[]): Costs {
  return { checks, total: { runs: 0, cpu: null, paths: 0, refusals: 0 }, unread: [], other: [] }
}

export function spacedOnce(said: string | undefined): string {
  return (said ?? "").replace(/\s+/g, " ")
}
