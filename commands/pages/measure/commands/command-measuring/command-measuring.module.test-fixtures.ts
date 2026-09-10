import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import { agoOf, HOUR } from "../../checks/check-measuring/check-measuring.module.test-fixtures.ts"

export const ONE = "01a08071-39a4-7000-9c6b-6cee59d30d10"

export const TWO = "01a08071-39a4-7000-9c6b-6cee59d30d20"

export const THREE = "01a08071-39a4-7000-9c6b-6cee59d30d30"

export function lineOf(one: Record<string, unknown>): string {
  return JSON.stringify({
    runId: ONE,
    ranAt: agoOf(HOUR),
    phase: "command",
    ran: "index",
    wallMs: 0,
    cpuSeconds: 0,
    childCpuSeconds: 0,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 0,
    peakMeasured: true,
    pathsChanged: 0,
    refusals: 0,
    ...one,
  })
}

export function pageAt(folder: string, slug: string, part = 1): string {
  const named =
    part === 1
      ? `${slug}.command.entries.uncommitted.jsonl`
      : `${slug}.command.entries.part${part}.uncommitted.jsonl`
  return `${folder}/${slug}/${named}`
}

export function rowsInto(
  root: string,
  at: string,
  rows: readonly Record<string, unknown>[]
): string {
  put(root, at, `${rows.map(lineOf).join("\n")}\n`)
  return root
}
