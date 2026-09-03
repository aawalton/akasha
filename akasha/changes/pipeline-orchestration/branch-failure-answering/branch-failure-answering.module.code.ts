import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { patchPage, patchState } from "@tools/lib/page-write"
import type { Value } from "@tools/lib/page-write-values"
import {
  decideBranchResolution,
  type PassedWorkflowWitness,
} from "../branch-resolution-decision/branch-resolution-decision.module.code.ts"
import { LOG } from "../orchestrator-log/orchestrator-log.module.code.ts"
import { rowsOf, seqIn, textIn } from "../pipeline-page-rows/pipeline-page-rows.module.code.ts"
import {
  ANSWERED_ELSEWHERE,
  CASCADABLE_STATUSES,
  FAILED,
  PASSED,
} from "../pipeline-statuses/pipeline-statuses.module.code.ts"
import type { Ceiling } from "../tick-ceiling/tick-ceiling.module.code.ts"

const SEQ = "seq"

const STATUS = "status"

const BRANCH = "branch"

const NAME = "name"

const PIPELINE_SEQ = "pipeline-seq"

const WORKFLOW_SEQ = "workflow-seq"

const WAITING_ON = "answering failures a later pipeline cured"

interface PipelineFacts {
  readonly seq: number
  readonly branch: string
  readonly status: string
}

interface WorkflowFacts {
  readonly seq: number
  readonly name: string | null
  readonly status: string | null
  readonly pipelineSeq: number | null
}

interface StepFacts {
  readonly seq: number
  readonly status: string | null
  readonly workflowSeq: number | null
}

export interface BranchResolutionResult {
  readonly scanned: number
  readonly answered: number
  readonly errors: number
}

function readPipelines(roots: Roots): readonly PipelineFacts[] {
  const out: PipelineFacts[] = []
  for (const row of rowsOf(roots, { pageType: "pipeline", keys: [SEQ, BRANCH, STATUS] })) {
    const seq = seqIn(row, SEQ)
    const branch = textIn(row, BRANCH)
    const status = textIn(row, STATUS)
    if (seq === null || branch === null || status === null) continue
    out.push({ seq, branch, status })
  }
  return out
}

function readWorkflows(roots: Roots): readonly WorkflowFacts[] {
  const out: WorkflowFacts[] = []
  const rows = rowsOf(roots, { pageType: "workflow", keys: [SEQ, NAME, STATUS, PIPELINE_SEQ] })
  for (const row of rows) {
    const seq = seqIn(row, SEQ)
    if (seq === null) continue
    out.push({
      seq,
      name: textIn(row, NAME),
      status: textIn(row, STATUS),
      pipelineSeq: seqIn(row, PIPELINE_SEQ),
    })
  }
  return out
}

function readSteps(roots: Roots): readonly StepFacts[] {
  const out: StepFacts[] = []
  for (const row of rowsOf(roots, { pageType: "step", keys: [SEQ, STATUS, WORKFLOW_SEQ] })) {
    const seq = seqIn(row, SEQ)
    if (seq === null) continue
    out.push({ seq, status: textIn(row, STATUS), workflowSeq: seqIn(row, WORKFLOW_SEQ) })
  }
  return out
}

function witnessesByBranch(
  workflows: readonly WorkflowFacts[],
  branchBySeq: ReadonlyMap<number, string>
): ReadonlyMap<string, readonly PassedWorkflowWitness[]> {
  const newest = new Map<string, Map<string, number>>()
  for (const one of workflows) {
    if (one.status !== PASSED || one.name === null || one.pipelineSeq === null) continue
    const branch = branchBySeq.get(one.pipelineSeq)
    if (branch === undefined) continue
    const held = newest.get(branch) ?? new Map<string, number>()
    const at = held.get(one.name)
    if (at === undefined || one.pipelineSeq > at) held.set(one.name, one.pipelineSeq)
    newest.set(branch, held)
  }
  const out = new Map<string, readonly PassedWorkflowWitness[]>()
  for (const [branch, byName] of newest) {
    const witnesses = [...byName].map(([workflowName, pipelineSeq]) => ({
      workflowName,
      pipelineSeq,
    }))
    out.set(branch, witnesses)
  }
  return out
}

function patchedPage(
  roots: Roots,
  pageType: string,
  seq: number,
  values: Readonly<Record<string, Value>>
): void {
  if (patchPage(roots, pageType, String(seq), values) === null) {
    throw new Error(`${LOG} \`${pageType}\` #${seq} names no file to write`)
  }
}

function patchedState(
  roots: Roots,
  pageType: string,
  seq: number,
  values: Readonly<Record<string, unknown>>
): void {
  if (patchState(roots, pageType, String(seq), values) === null) {
    throw new Error(`${LOG} \`${pageType}\` #${seq} names no sidecar to write`)
  }
}

function cascadable(status: string | null): boolean {
  return status !== null && CASCADABLE_STATUSES.has(status)
}

function answerOnePipeline(
  roots: Roots,
  pipeline: PipelineFacts,
  workflows: readonly WorkflowFacts[],
  steps: readonly StepFacts[],
  witnesses: readonly PassedWorkflowWitness[]
): boolean {
  const own = workflows.filter((one) => one.pipelineSeq === pipeline.seq)
  const stalled = own.filter((one) => cascadable(one.status))
  const decision = decideBranchResolution({
    pipelineSeq: pipeline.seq,
    failedWorkflowNames: stalled.flatMap((one) => (one.name === null ? [] : [one.name])),
    witnesses,
  })
  if (!decision.answeredElsewhere) return false

  patchedPage(roots, "pipeline", pipeline.seq, { status: ANSWERED_ELSEWHERE })
  for (const one of stalled) patchedPage(roots, "workflow", one.seq, { status: ANSWERED_ELSEWHERE })

  const under = new Set<number>(
    own
      .filter((one) => cascadable(one.status) || one.status === ANSWERED_ELSEWHERE)
      .map((one) => one.seq)
  )
  let cascaded = 0
  for (const one of steps) {
    if (one.workflowSeq === null || !under.has(one.workflowSeq) || !cascadable(one.status)) continue
    patchedState(roots, "step", one.seq, { status: ANSWERED_ELSEWHERE })
    cascaded += 1
  }

  console.log(
    `${LOG} answered-elsewhere seq=${pipeline.seq} branch=${pipeline.branch} ` +
      `workflows=${stalled.length} steps=${cascaded}`
  )
  return true
}

export function resolveBranchFailures(roots: Roots, ceiling: Ceiling): BranchResolutionResult {
  const pipelines = readPipelines(roots)
  const workflows = readWorkflows(roots)
  const steps = readSteps(roots)

  const branchBySeq = new Map<number, string>()
  const newestByBranch = new Map<string, number>()
  for (const one of pipelines) {
    branchBySeq.set(one.seq, one.branch)
    const held = newestByBranch.get(one.branch)
    if (held === undefined || one.seq > held) newestByBranch.set(one.branch, one.seq)
  }

  const candidates = pipelines
    .filter((one) => one.status === FAILED && (newestByBranch.get(one.branch) ?? one.seq) > one.seq)
    .sort((a, b) => a.seq - b.seq)
  const witnesses = witnessesByBranch(workflows, branchBySeq)

  let answered = 0
  let errors = 0
  for (const candidate of candidates) {
    if (ceiling.reached()) throw ceiling.refuse(WAITING_ON)
    try {
      const took = answerOnePipeline(
        roots,
        candidate,
        workflows,
        steps,
        witnesses.get(candidate.branch) ?? []
      )
      if (took) answered += 1
    } catch (err) {
      errors += 1
      console.error(`${LOG} answering pipeline seq=${candidate.seq} failed:`, err)
    }
  }
  return { scanned: candidates.length, answered, errors }
}
