import type { Roots } from "@akasha/pages-system/markdown-page-at"
import type { Row } from "@tools/lib/page-derive-shape"
import { answer } from "@tools/lib/page-query"
import { textOf } from "@tools/lib/page-query-values"

const STEP = "step"

const PIPELINE = "pipeline"

const SEQ = "seq"

const STATUS = "status"

const CONTAINER_NAME = "container-name"

const STARTED_AT = "started-at"

export const EXIT_CODE = "exit-code"

export const FAILURE_REASON = "failure-reason"

export const INFRA_FAILURE_KIND = "infra-failure-kind"

export const LAUNCH_REFUSED_REASON = "launch-refused-reason"

export interface MatchedStep {
  readonly seq: string
  readonly status: string
  readonly startedAt: string | null
}

function rowsOf(
  roots: Roots,
  pageType: string,
  query: Parameters<typeof answer>[1]
): readonly Row[] {
  const found = answer(roots, query)
  if (found === null) {
    throw new Error(
      `\`${pageType}\` names no page type whose pages are files, so nothing can be read`
    )
  }
  return found.rows
}

export function stepsByContainerName(
  roots: Roots,
  containerNames: readonly string[]
): ReadonlyMap<string, MatchedStep> {
  const out = new Map<string, MatchedStep>()
  if (containerNames.length === 0) return out
  const rows = rowsOf(roots, STEP, {
    pageType: STEP,
    where: [{ key: CONTAINER_NAME, in: containerNames }],
    keys: [SEQ, STATUS, CONTAINER_NAME, STARTED_AT],
  })
  for (const row of rows) {
    const name = textOf(row.values, CONTAINER_NAME)
    const seq = textOf(row.values, SEQ)
    const status = textOf(row.values, STATUS)
    if (name === null || seq === null || status === null) continue
    if (out.has(name)) continue
    out.set(name, { seq, status, startedAt: textOf(row.values, STARTED_AT) })
  }
  return out
}

export function pipelineStatusBySeq(
  roots: Roots,
  seqs: readonly string[]
): ReadonlyMap<string, string> {
  const out = new Map<string, string>()
  if (seqs.length === 0) return out
  const rows = rowsOf(roots, PIPELINE, {
    pageType: PIPELINE,
    where: [{ key: SEQ, in: seqs }],
    keys: [SEQ, STATUS],
  })
  for (const row of rows) {
    const seq = textOf(row.values, SEQ)
    const status = textOf(row.values, STATUS)
    if (seq === null || status === null) continue
    if (!out.has(seq)) out.set(seq, status)
  }
  return out
}
