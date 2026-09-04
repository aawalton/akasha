import type { Answer } from "@akasha/command-system/calling"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  aloneIn,
  answering,
  asJson,
  JSON_SAID,
  keyedLines,
  type Reading,
  refusedBy,
  seqOf,
  told,
  wordsIn,
} from "../pipeline-answering/pipeline-answering.module.code.ts"
import {
  getPipelineBySeq,
  listStepsForPipeline,
  listWorkflowsForPipeline,
  optionalNumber,
  optionalString,
  type Row,
  summarizeWorkflows,
  type WorkflowStatusSummary,
} from "../pipeline-page-reading/pipeline-page-reading.module.code.ts"

const SWITCHES = [JSON_SAID]

const DISPATCHING = "dispatching"

export type Read = {
  readonly seq: number
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, [], SWITCHES)
  if ("refused" in said) return said
  const alone = aloneIn(said, "the pipeline's seq")
  if (typeof alone === "object" && alone !== null) return alone
  const seq = seqOf(alone)
  if (typeof seq === "object") return seq
  return { seq, json: said.flags.has(JSON_SAID) }
}

export type CapacityWait = {
  readonly waiting: number
  readonly nodes: readonly string[]
}

export function capacityWaitOf(roots: Roots, pipeline: Row): CapacityWait {
  const nodes = new Set<string>()
  let waiting = 0
  for (const step of listStepsForPipeline(roots, { pipeline, status: DISPATCHING })) {
    if (optionalString(step, "dispatchWaitReason") === undefined) continue
    waiting += 1
    const node = optionalString(step, "dispatchWaitNode")
    if (node !== undefined) nodes.add(node)
  }
  return { waiting, nodes: [...nodes].sort() }
}

export function fieldsOf(pipeline: Row): Readonly<Record<string, string | number | undefined>> {
  return {
    seq: optionalNumber(pipeline, "seq"),
    status: optionalString(pipeline, "status"),
    branch: optionalString(pipeline, "branch"),
    commitSha: optionalString(pipeline, "commit"),
    createdAt: optionalString(pipeline, "createdAt"),
    updatedAt: optionalString(pipeline, "updatedAt"),
    supersededBy: optionalNumber(pipeline, "overtakenBySeq"),
  }
}

export function shownAs(
  fields: Readonly<Record<string, string | number | undefined>>,
  summary: WorkflowStatusSummary,
  capacityWait: CapacityWait
): readonly string[] {
  const lines = keyedLines(Object.entries(fields))
  lines.push(`workflow.total\t${summary.total}`)
  for (const [status, count] of Object.entries(summary.byStatus)) {
    lines.push(`workflow.${status}\t${count}`)
  }
  if (capacityWait.waiting === 0) return lines
  lines.push(`capacityWait.waiting\t${capacityWait.waiting}`)
  if (capacityWait.nodes.length > 0) {
    lines.push(`capacityWait.nodes\t${capacityWait.nodes.join(",")}`)
  }
  return lines
}

function shown(read: Read): Answer {
  const roots = resolveRoots()
  const pipeline = getPipelineBySeq(roots, read.seq)
  const summary = summarizeWorkflows(listWorkflowsForPipeline(roots, { pipelineSeq: read.seq }))
  const capacityWait = capacityWaitOf(roots, pipeline)
  const fields = fieldsOf(pipeline)
  if (read.json) return asJson({ pipeline: fields, workflows: summary, capacityWait })
  return told(shownAs(fields, summary, capacityWait))
}

export async function pipelineShow(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => shown(read))
}
