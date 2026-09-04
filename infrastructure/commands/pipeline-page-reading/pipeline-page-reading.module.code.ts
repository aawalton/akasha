import { DataError, OperationalError } from "@akasha/errors-core/exit-code"
import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { asking, type Query, type Test } from "@akasha/pages-system-service/asking"
import {
  pipelineNotFoundMessage,
  pipelineSubjectOf,
} from "../pipeline-subject/pipeline-subject.module.code.ts"

export type Row = Record<string, unknown>

const PIPELINE = "pipeline"

const WORKFLOW = "workflow"

const STEP = "step"

const STEP_PAGE_LIMIT = 2000

type Where = Readonly<Record<string, Test>>

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
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
  for (const [key, value] of Object.entries(values)) out[key] = nativeScalar(value)
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

function askRows(roots: Roots, query: Query, context: string): readonly Row[] {
  const asked = asking(rootFor(roots, AKASHA), query)
  if ("refused" in asked) {
    throw new OperationalError(
      `${context}: \`${query.pageTypeSlug}\` went unread — ${asked.refused}`
    )
  }
  return asked.rows.map(rowFromValues)
}

function askRow(roots: Roots, query: Query, context: string): Row | null {
  return askRows(roots, query, context)[0] ?? null
}

export function getPipelineBySeq(roots: Roots, seq: number): Row {
  const row = askRow(
    roots,
    { pageTypeSlug: PIPELINE, where: { seq: { is: String(seq) } }, limit: 1 },
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
  const where: Where = {
    ...(args.branch === undefined ? {} : { branch: { is: args.branch } }),
    ...(args.status === undefined ? {} : { status: { is: args.status } }),
  }
  return askRows(
    roots,
    {
      pageTypeSlug: PIPELINE,
      ...(Object.keys(where).length === 0 ? {} : { where }),
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
  const where: Where = {
    pipelineSeq: { is: String(args.pipelineSeq) },
    ...(args.status === undefined ? {} : { status: { is: args.status } }),
  }
  return askRows(roots, { pageTypeSlug: WORKFLOW, where, limit: 500 }, "workflow list")
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

  const where: Where = {
    pipelineSeq: { is: String(pipelineSeq) },
    ...(args.status === undefined ? {} : { status: { is: args.status } }),
  }
  const rows = askRows(roots, { pageTypeSlug: STEP, where, limit: STEP_PAGE_LIMIT }, "step list")

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
      pageTypeSlug: STEP,
      where: { title: { is: args.stepName } },
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
  pageTypeSlug: string,
  seqs: readonly number[],
  context: string
): ReadonlyMap<number, Row> {
  if (seqs.length === 0) return new Map()
  const rows = askRows(
    roots,
    { pageTypeSlug, where: { seq: { in: seqs.map(String) } }, limit: seqs.length },
    context
  )
  return new Map(rows.map((row) => [requireNumber(row, "seq", `${pageTypeSlug} row`), row]))
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
      pageTypeSlug: WORKFLOW,
      where: {
        pipelineSeq: { is: String(pipelineSeq) },
        slug: { is: workflowName },
      },
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
      pageTypeSlug: STEP,
      where: {
        workflowSeq: { is: String(workflowSeq) },
        title: { is: stepName },
      },
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
