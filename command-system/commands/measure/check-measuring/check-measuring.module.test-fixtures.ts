import { put } from "@akasha/testing-system/putting"
import type { CheckCost, Chosen, Costs } from "./check-measuring.module.code.ts"
import { totalOf } from "./check-measuring.module.code.ts"

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

export function rowsInto(
  root: string,
  held: Record<string, readonly Record<string, unknown>[]>
): string {
  for (const [check, rows] of Object.entries(held)) {
    put(
      root,
      `checks/code-checks/pages/${check}/${check}.code-check.entries.uncommitted.jsonl`,
      `${rows.map(lineOf).join("\n")}\n`
    )
  }
  return root
}

export function costsOf(checks: readonly CheckCost[]): Costs {
  return { checks, total: totalOf([]), unread: [], other: [] }
}

export function spacedOnce(said: string | undefined): string {
  return (said ?? "").replace(/\s+/g, " ")
}
