import {
  listedFiled,
  nothingFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import {
  agoOf,
  HOUR,
} from "../../../../../checks/modules/measuring/check-measuring.module.test-fixtures.ts"

export const ONE = "01a08071-39a4-7000-9c6b-6cee59d30c10"

export const TWO = "01a08071-39a4-7000-9c6b-6cee59d30c20"

export const THREE = "01a08071-39a4-7000-9c6b-6cee59d30c30"

const COMMAND = "command"

const CHANGE_SLUG = "change-draft"

const APPLY_SLUG = "change-apply"

export const CHANGE_AT = `commands/pages/change/draft/${CHANGE_SLUG}.${COMMAND}`

export const APPLY_AT = `commands/pages/change/apply/${APPLY_SLUG}.${COMMAND}`

const SLUGGED: Readonly<Record<string, string>> = {
  [CHANGE_AT]: CHANGE_SLUG,
  [APPLY_AT]: APPLY_SLUG,
}

const IDS: Readonly<Record<string, string>> = {
  [CHANGE_SLUG]: "01a08071-39a4-7000-9c6b-6cee59d30d10",
  [APPLY_SLUG]: "01a08071-39a4-7000-9c6b-6cee59d30d20",
}

export function commandFiled(root: string, at: string): string {
  nothingFiled(root)
  const slug = SLUGGED[at]
  if (slug !== undefined) {
    listedFiled(root, COMMAND, slug, [{ path: `${at}.ts`, id: IDS[slug] }])
  }
  return root
}

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
  commandFiled(root, at)
  put(root, partAt(at, part), `${rows.map(lineOf).join("\n")}\n`)
  return root
}
