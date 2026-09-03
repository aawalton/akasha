import { DataError, OperationalError } from "@akasha/errors-core/exit-code"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { type PageQuery, UNREACHED } from "@akasha/pages-system/page-query-shape"
import { answer } from "@tools/lib/page-query"
import {
  pipelineNotFoundMessage,
  pipelineSubjectOf,
  type Row,
} from "../pipeline-subject/pipeline-subject.module.code.ts"

export type { Row }

const PIPELINE = "pipeline"

const WORKFLOW = "workflow"

const STEP = "step"

const STEP_PAGE_LIMIT = 2000

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

function camelKey(key: string): string {
  return key.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())
}

function nativeScalar(value: unknown): unknown {
  if (typeof value !== "string") return value
  if (value === "true") return true
  if (value === "false") return false
  if (value !== "" && /^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  return value
}

function rowFromValues(values: Readonly<Record<string, unknown>>): Row {
  const out: Row = {}
  for (const [key, value] of Object.entries(values)) out[camelKey(key)] = nativeScalar(value)
  return out
}

export function requireString(row: Row, key: string, context: string): string {
  const stated = asString(row[key])
  if (stated === undefined) {
    throw new OperationalError(`${context}: expected string at "${key}", got ${typeof row[key]}`)
  }
  return stated
}

export function optionalString(row: Row, key: string): string | undefined {
  return asString(row[key])
}

export function requireNumber(row: Row, key: string, context: string): number {
  const stated = row[key]
  if (typeof stated !== "number") {
    throw new OperationalError(`${context}: ${key} is ${typeof stated}, and a number was wanted`)
  }
  return stated
}

export function optionalNumber(row: Row, key: string): number | undefined {
  return asNumber(row[key])
}

export function optionalSeqRef(row: Row, key: string): number | undefined {
  const stated = row[key]
  if (typeof stated === "number") return Number.isInteger(stated) ? stated : undefined
  if (typeof stated !== "string" || stated.trim() === "") return undefined
  const parsed = Number(stated)
  return Number.isInteger(parsed) ? parsed : undefined
}

function askRows(roots: Roots, query: PageQuery, context: string): readonly Row[] {
  const found = answer(roots, query)
  if (found === null) throw new OperationalError(`${context}: \`${query.pageType}\` ${UNREACHED}`)
  return found.rows.map((row) => rowFromValues(row.values))
}

function askRow(roots: Roots, query: PageQuery, context: string): Row | null {
  return askRows(roots, query, context)[0] ?? null
}

export function getPipelineBySeq(roots: Roots, seq: number): Row {
  const row = askRow(
    roots,
    { pageType: PIPELINE, where: [{ key: "seq", is: String(seq) }], limit: 1 },
    "pipeline lookup"
  )
  if (row === null) throw new DataError(pipelineNotFoundMessage(seq))
  return row
}

function resolvedPipelineRefusal(pipeline: Row, detail: string): Error {
  return new DataError(`${detail} — ${pipelineSubjectOf(pipeline)}`)
}

export interface ListPipelinesArgs {
  readonly branch?: string
  readonly status?: string
  readonly limit: number
}

export function listPipelines(roots: Roots, args: ListPipelinesArgs): readonly Row[] {
  const where = [
    ...(args.branch === undefined ? [] : [{ key: "branch", is: args.branch }]),
    ...(args.status === undefined ? [] : [{ key: "status", is: args.status }]),
  ]
  return askRows(
    roots,
    {
      pageType: PIPELINE,
      ...(where.length === 0 ? {} : { where }),
      sortBy: "seq",
      descending: true,
      limit: args.limit,
    },
    "pipeline list"
  )
}

export interface ListWorkflowsArgs {
  readonly pipelineSeq: number
  readonly status?: string
}

export function listWorkflowsForPipeline(roots: Roots, args: ListWorkflowsArgs): readonly Row[] {
  const where = [
    { key: "pipeline-seq", is: String(args.pipelineSeq) },
    ...(args.status === undefined ? [] : [{ key: "status", is: args.status }]),
  ]
  return askRows(roots, { pageType: WORKFLOW, where, limit: 500 }, "workflow list")
}

export interface ListStepsArgs {
  readonly pipeline: Row
  readonly workflowName?: string
  readonly status?: string
}

export function listStepsForPipeline(
  roots: Roots,
  args: ListStepsArgs
): ReadonlyArray<Row & { readonly workflowName: string }> {
  const pipelineSeq = requireNumber(args.pipeline, "seq", "pipeline row")
  const workflowRows = listWorkflowsForPipeline(roots, { pipelineSeq })
  const wanted = args.workflowName
  const selected =
    wanted === undefined
      ? workflowRows
      : workflowRows.filter((one) => optionalString(one, "slug") === wanted)
  if (wanted !== undefined && selected.length === 0) {
    throw resolvedPipelineRefusal(args.pipeline, `workflow "${wanted}" not found`)
  }

  const nameByWorkflowSeq = new Map(
    selected.map((one) => [
      requireNumber(one, "seq", "workflow row"),
      requireString(one, "slug", "workflow row"),
    ])
  )

  const where = [
    { key: "pipeline-seq", is: String(pipelineSeq) },
    ...(args.status === undefined ? [] : [{ key: "status", is: args.status }]),
  ]
  const rows = askRows(roots, { pageType: STEP, where, limit: STEP_PAGE_LIMIT }, "step list")

  return rows.flatMap((row) => {
    const workflowSeq = optionalSeqRef(row, "workflowSeq")
    const workflowName = workflowSeq === undefined ? undefined : nameByWorkflowSeq.get(workflowSeq)
    return workflowName === undefined ? [] : [{ ...row, workflowName }]
  })
}

export interface ListStepRunsByNameArgs {
  readonly stepName: string
  readonly limit: number
}

export interface StepRunRow {
  readonly pipelineSeq: number | undefined
  readonly branch: string | undefined
  readonly workflowName: string | undefined
  readonly status: string | undefined
  readonly startedAt: string | undefined
  readonly completedAt: string | undefined
}

export function listStepRunsByName(
  roots: Roots,
  args: ListStepRunsByNameArgs
): readonly StepRunRow[] {
  const stepRows = askRows(
    roots,
    {
      pageType: STEP,
      where: [{ key: "title", is: args.stepName }],
      sortBy: "seq",
      descending: true,
      limit: args.limit,
    },
    "step-run list"
  )
  if (stepRows.length === 0) return []

  const pipelineBySeq = pagesBySeq(
    roots,
    PIPELINE,
    uniqueSeqRefs(stepRows, "pipelineSeq"),
    "step-run pipeline list"
  )
  const workflowBySeq = pagesBySeq(
    roots,
    WORKFLOW,
    uniqueSeqRefs(stepRows, "workflowSeq"),
    "step-run workflow list"
  )

  return stepRows.map((step) => {
    const pipelineSeq = optionalSeqRef(step, "pipelineSeq")
    const pipeline = pipelineSeq === undefined ? undefined : pipelineBySeq.get(pipelineSeq)
    const workflowSeq = optionalSeqRef(step, "workflowSeq")
    const workflow = workflowSeq === undefined ? undefined : workflowBySeq.get(workflowSeq)
    return {
      pipelineSeq,
      branch: pipeline === undefined ? undefined : optionalString(pipeline, "branch"),
      workflowName: workflow === undefined ? undefined : optionalString(workflow, "slug"),
      status: optionalString(step, "status"),
      startedAt: optionalString(step, "startedAt"),
      completedAt: optionalString(step, "completedAt"),
    }
  })
}

function uniqueSeqRefs(rows: readonly Row[], key: string): readonly number[] {
  return [
    ...new Set(
      rows.map((row) => optionalSeqRef(row, key)).filter((seq): seq is number => seq !== undefined)
    ),
  ]
}

function pagesBySeq(
  roots: Roots,
  pageType: string,
  seqs: readonly number[],
  context: string
): ReadonlyMap<number, Row> {
  if (seqs.length === 0) return new Map()
  const rows = askRows(
    roots,
    { pageType, where: [{ key: "seq", in: seqs.map(String) }], limit: seqs.length },
    context
  )
  return new Map(rows.map((row) => [requireNumber(row, "seq", `${pageType} row`), row]))
}

export function resolveStepPodName(
  roots: Roots,
  pipeline: Row,
  workflowName: string,
  stepName: string
): string {
  const pipelineSeq = requireNumber(pipeline, "seq", "pipeline row")
  const workflow = askRow(
    roots,
    {
      pageType: WORKFLOW,
      where: [
        { key: "pipeline-seq", is: String(pipelineSeq) },
        { key: "slug", is: workflowName },
      ],
      limit: 1,
    },
    "workflow lookup"
  )
  if (workflow === null) {
    throw resolvedPipelineRefusal(pipeline, `workflow "${workflowName}" not found`)
  }
  const workflowSeq = requireNumber(workflow, "seq", "workflow row")
  const step = askRow(
    roots,
    {
      pageType: STEP,
      where: [
        { key: "workflow-seq", is: String(workflowSeq) },
        { key: "title", is: stepName },
      ],
      limit: 1,
    },
    "step lookup"
  )
  if (step === null) {
    throw resolvedPipelineRefusal(
      pipeline,
      `step "${stepName}" not found on workflow "${workflowName}"`
    )
  }
  const containerName = optionalString(step, "containerName")
  if (containerName === undefined) {
    throw resolvedPipelineRefusal(
      pipeline,
      `step "${stepName}" has no container-name yet (status: ${optionalString(step, "status") ?? "unknown"})`
    )
  }
  return containerName
}

export interface WorkflowStatusSummary {
  readonly total: number
  readonly byStatus: Readonly<Record<string, number>>
}

export function summarizeWorkflows(workflows: readonly Row[]): WorkflowStatusSummary {
  const byStatus: Record<string, number> = {}
  for (const one of workflows) {
    const status = optionalString(one, "status") ?? "unknown"
    byStatus[status] = (byStatus[status] ?? 0) + 1
  }
  return { total: workflows.length, byStatus }
}
