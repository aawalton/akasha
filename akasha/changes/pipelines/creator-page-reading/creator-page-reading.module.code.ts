import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { asking, type Query, type Row } from "@akasha/pages-system-service/asking"

export const MAIN_BRANCH = "main"

export const PIPELINE = "pipeline"

export const WORKFLOW = "workflow"

export const UNFINISHED_PIPELINE_STATUSES: readonly string[] = ["pending", "dispatching", "running"]

export const UNDERWAY_PIPELINE_STATUSES: readonly string[] = ["dispatching", "running"]

const TERMINAL_WORKFLOW_STATUSES: readonly string[] = [
  "passed",
  "failed",
  "blocked",
  "skipped",
  "answered-elsewhere",
  "overtaken",
]

export interface PipelineRow {
  readonly seq: number
  readonly status: string
  readonly commit: string | null
  readonly changedFiles: readonly string[]
}

export interface WorkflowRow {
  readonly seq: number
  readonly pipelineSeq: number
  readonly name: string
  readonly status: string
  readonly kind: string | null
  readonly dependsOn: readonly string[]
  readonly changedFiles: readonly string[]
}

function rowsOf(roots: Roots, query: Query): readonly Row[] {
  const held = asking(rootFor(roots, AKASHA), query)
  if ("refused" in held) {
    throw new Error(
      `main-pipeline-creator: \`${query.pageTypeSlug}\` went unread, so nothing could be read for it: ${held.refused}`
    )
  }
  return held.rows
}

function said(row: Row, key: string): string | null {
  const one = row[key]
  if (typeof one !== "string") return null
  return one.trim() === "" ? null : one
}

function listed(row: Row, key: string): readonly string[] {
  const one = row[key]
  if (typeof one === "string") return [one]
  if (!Array.isArray(one)) return []
  return one.filter((each): each is string => typeof each === "string")
}

function seqOf(row: Row): number {
  const stated = said(row, "seq")
  const seq = Number(stated)
  if (!Number.isInteger(seq) || seq <= 0) {
    throw new Error(`main-pipeline-creator: \`seq: ${stated}\` names no page`)
  }
  return seq
}

function pipelineOf(row: Row): PipelineRow {
  return {
    seq: seqOf(row),
    status: said(row, "status") ?? "pending",
    commit: said(row, "commit"),
    changedFiles: listed(row, "changedFiles"),
  }
}

function workflowOf(row: Row): WorkflowRow {
  return {
    seq: seqOf(row),
    pipelineSeq: Number(said(row, "pipelineSeq") ?? "0"),
    name: said(row, "slug") ?? "",
    status: said(row, "status") ?? "pending",
    kind: said(row, "kind"),
    dependsOn: listed(row, "dependsOn"),
    changedFiles: listed(row, "changedFiles"),
  }
}

const PIPELINE_KEYS: readonly string[] = ["seq", "status", "commit", "changedFiles"]

export function pipelinesAtCommit(
  roots: Roots,
  branch: string,
  commit: string
): readonly PipelineRow[] {
  return rowsOf(roots, {
    pageTypeSlug: PIPELINE,
    where: { branch: { is: branch }, commit: { is: commit } },
    sortBy: "seq",
    keys: PIPELINE_KEYS,
  }).map(pipelineOf)
}

export function lastPipelinedCommit(roots: Roots, branch: string): string | null {
  const rows = rowsOf(roots, {
    pageTypeSlug: PIPELINE,
    where: { branch: { is: branch } },
    sortBy: "seq",
    descending: true,
    limit: 1,
    keys: PIPELINE_KEYS,
  })
  const first = rows[0]
  return first === undefined ? null : said(first, "commit")
}

export function unfinishedPipelines(roots: Roots, branch: string): readonly PipelineRow[] {
  return rowsOf(roots, {
    pageTypeSlug: PIPELINE,
    where: { branch: { is: branch }, status: { in: UNFINISHED_PIPELINE_STATUSES } },
    sortBy: "seq",
    keys: PIPELINE_KEYS,
  }).map(pipelineOf)
}

export function liveWorkflowsOf(
  roots: Roots,
  pipelineSeqs: readonly number[]
): readonly WorkflowRow[] {
  if (pipelineSeqs.length === 0) return []
  return rowsOf(roots, {
    pageTypeSlug: WORKFLOW,
    where: {
      pipelineSeq: { in: pipelineSeqs.map(String) },
      status: { "not-in": TERMINAL_WORKFLOW_STATUSES },
    },
    sortBy: "seq",
    keys: ["seq", "pipelineSeq", "name", "status", "kind", "dependsOn", "changedFiles"],
  }).map(workflowOf)
}
