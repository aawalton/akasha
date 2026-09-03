import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { rowsOf, seqIn, textIn } from "../pipeline-page-rows/pipeline-page-rows.module.code.ts"
import {
  NON_TERMINAL_PIPELINE_STATUSES,
  NON_TERMINAL_STEP_STATUSES,
  NON_TERMINAL_WORKFLOW_STATUSES,
} from "../pipeline-statuses/pipeline-statuses.module.code.ts"

const SEQ = "seq"

const STATUS = "status"

const PIPELINE_SEQ = "pipeline-seq"

export interface HealingPipeline {
  readonly seq: number
  readonly status: string | null
}

export interface DesiredPipelines {
  readonly seqs: ReadonlySet<number>
  readonly healing: readonly HealingPipeline[]
}

function pipelineSeqsUnder(
  roots: Roots,
  pageType: string,
  statuses: readonly string[]
): readonly number[] {
  const rows = rowsOf(roots, {
    pageType,
    where: [{ key: STATUS, in: statuses }],
    keys: [PIPELINE_SEQ],
  })
  const out: number[] = []
  for (const row of rows) {
    const seq = seqIn(row, PIPELINE_SEQ)
    if (seq !== null) out.push(seq)
  }
  return out
}

export function loadDesiredPipelines(roots: Roots): DesiredPipelines {
  const seqs = new Set<number>()
  const own = rowsOf(roots, {
    pageType: "pipeline",
    where: [{ key: STATUS, in: NON_TERMINAL_PIPELINE_STATUSES }],
    keys: [SEQ],
  })
  for (const row of own) {
    const seq = seqIn(row, SEQ)
    if (seq !== null) seqs.add(seq)
  }

  const descended = new Set<number>([
    ...pipelineSeqsUnder(roots, "workflow", NON_TERMINAL_WORKFLOW_STATUSES),
    ...pipelineSeqsUnder(roots, "step", NON_TERMINAL_STEP_STATUSES),
  ])
  const owing = [...descended].filter((seq) => !seqs.has(seq)).sort((a, b) => a - b)
  if (owing.length === 0) return { seqs, healing: [] }

  const held = new Map<number, string | null>()
  for (const row of rowsOf(roots, {
    pageType: "pipeline",
    where: [{ key: SEQ, in: owing.map(String) }],
    keys: [SEQ, STATUS],
  })) {
    const seq = seqIn(row, SEQ)
    if (seq !== null) held.set(seq, textIn(row, STATUS))
  }

  const healing: HealingPipeline[] = []
  for (const seq of owing) {
    if (!held.has(seq)) continue
    seqs.add(seq)
    healing.push({ seq, status: held.get(seq) ?? null })
  }
  return { seqs, healing }
}
