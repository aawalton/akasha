import type { Roots } from "@akasha/pages-system/markdown-page-at"
import type { Row } from "@akasha/pages-system/page-derive-shape"
import { type PageQuery, UNREACHED } from "@akasha/pages-system/page-query-shape"
import { listOf, textOf } from "@akasha/pages-system/page-query-values"
import { answer } from "@tools/lib/page-query"

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

function rowsOf(roots: Roots, query: PageQuery): readonly Row[] {
  const held = answer(roots, query)
  if (held === null) {
    throw new Error(
      `main-pipeline-creator: \`${query.pageType}\` ${UNREACHED}, so nothing could be read for it`
    )
  }
  return held.rows
}

function seqOf(row: Row): number {
  const stated = textOf(row.values, "seq")
  const seq = Number(stated)
  if (!Number.isInteger(seq) || seq <= 0) {
    throw new Error(
      `main-pipeline-creator: ${row.at} states \`seq: ${stated}\`, which names no page`
    )
  }
  return seq
}

function pipelineOf(row: Row): PipelineRow {
  return {
    seq: seqOf(row),
    status: textOf(row.values, "status") ?? "pending",
    commit: textOf(row.values, "commit"),
    changedFiles: listOf(row.values, "changed-files"),
  }
}

function workflowOf(row: Row): WorkflowRow {
  return {
    seq: seqOf(row),
    pipelineSeq: Number(textOf(row.values, "pipeline-seq") ?? "0"),
    name: textOf(row.values, "slug") ?? "",
    status: textOf(row.values, "status") ?? "pending",
    kind: textOf(row.values, "kind"),
    dependsOn: listOf(row.values, "depends-on"),
    changedFiles: listOf(row.values, "changed-files"),
  }
}

const PIPELINE_KEYS: readonly string[] = ["seq", "status", "commit", "changed-files"]

export function pipelinesAtCommit(
  roots: Roots,
  branch: string,
  commit: string
): readonly PipelineRow[] {
  return rowsOf(roots, {
    pageType: PIPELINE,
    where: [
      { key: "branch", is: branch },
      { key: "commit", is: commit },
    ],
    sortBy: "seq",
    keys: PIPELINE_KEYS,
  }).map(pipelineOf)
}

export function lastPipelinedCommit(roots: Roots, branch: string): string | null {
  const rows = rowsOf(roots, {
    pageType: PIPELINE,
    where: [{ key: "branch", is: branch }],
    sortBy: "seq",
    descending: true,
    limit: 1,
    keys: PIPELINE_KEYS,
  })
  const first = rows[0]
  return first === undefined ? null : textOf(first.values, "commit")
}

export function unfinishedPipelines(roots: Roots, branch: string): readonly PipelineRow[] {
  return rowsOf(roots, {
    pageType: PIPELINE,
    where: [
      { key: "branch", is: branch },
      { key: "status", in: UNFINISHED_PIPELINE_STATUSES },
    ],
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
    pageType: WORKFLOW,
    where: [
      { key: "pipeline-seq", in: pipelineSeqs.map(String) },
      { key: "status", notIn: TERMINAL_WORKFLOW_STATUSES },
    ],
    sortBy: "seq",
    keys: ["seq", "pipeline-seq", "name", "status", "kind", "depends-on", "changed-files"],
  }).map(workflowOf)
}
