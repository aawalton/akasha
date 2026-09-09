import { put } from "@akasha/testing-system/putting"
import {
  agoOf,
  HOUR,
} from "../../../../modules/check-measuring/check-measuring.module.test-fixtures.ts"

export const ONE = "01a08071-39a4-7000-9c6b-6cee59d30c10"

export const TWO = "01a08071-39a4-7000-9c6b-6cee59d30c20"

export const THREE = "01a08071-39a4-7000-9c6b-6cee59d30c30"

export const CHANGE_AT = "commands/pages/change-draft/change-draft.command"

export const APPLY_AT = "commands/pages/change-apply/change-apply.command"

export function lineOf(one: Record<string, unknown>): string {
  return JSON.stringify({
    runId: ONE,
    ranAt: agoOf(HOUR),
    phase: "change",
    ran: "change-file",
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

export function partAt(at: string, part: number): string {
  return part === 1
    ? `${at}.entries.uncommitted.jsonl`
    : `${at}.entries.part${part}.uncommitted.jsonl`
}

export function rowsInto(
  root: string,
  at: string,
  rows: readonly Record<string, unknown>[],
  part = 1
): string {
  put(root, partAt(at, part), `${rows.map(lineOf).join("\n")}\n`)
  return root
}
