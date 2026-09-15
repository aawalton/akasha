import { agoOf, HOUR } from "akasha/check/modules/measuring/check-measuring.module.test-fixtures.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

export const ONE = "01a08071-39a4-7000-9c6b-6cee59d30d10"

export const TWO = "01a08071-39a4-7000-9c6b-6cee59d30d20"

export const THREE = "01a08071-39a4-7000-9c6b-6cee59d30d30"

const COMMAND = "command"

export function commandFiled(
  root: string,
  slug: string,
  held: Record<string, unknown> = {}
): string {
  const path = `command/pages/${slug}/${slug}.${COMMAND}.ts`
  valueAlsoFiled(root, COMMAND, [
    { path, value: { id: THREE, pageTypeSlug: COMMAND, slug, ...held } },
  ])
  return root
}

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
