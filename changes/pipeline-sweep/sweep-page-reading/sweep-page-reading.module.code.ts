import { whereFor } from "@akasha/markdown-pages/page-write-where"
import { readUncommitted } from "@akasha/markdown-pages/uncommitted"
import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { asking, type Row } from "@akasha/pages-system-service/asking"
import { PIPELINE, STEP, WORKFLOW } from "@akasha/pipeline-sweep/pipeline-page-statuses"
import {
  PIPELINE_KEYS,
  type Pipeline,
  pipelineIn,
  STEP_KEYS,
  type Step,
  stepIn,
  WORKFLOW_KEYS,
  type Workflow,
  workflowIn,
} from "@akasha/pipeline-sweep/pipeline-row-entities"

export interface Snapshot {
  readonly pipelines: readonly Pipeline[]
  readonly workflows: readonly Workflow[]
  readonly steps: readonly Step[]
}

function rowsOf(root: string, pageTypeSlug: string, keys: readonly string[]): readonly Row[] {
  const asked = asking(root, { pageTypeSlug, keys })
  if ("refused" in asked) {
    throw new Error(
      `\`${pageTypeSlug}\` went unread, so the sweep has nothing to read: ${asked.refused}`
    )
  }
  return asked.rows
}

function held<T>(rows: readonly Row[], of: (row: Row) => T | null): readonly T[] {
  const out: T[] = []
  for (const row of rows) {
    const one = of(row)
    if (one !== null) out.push(one)
  }
  return out
}

export function readSnapshot(roots: Roots): Snapshot {
  const root = rootFor(roots, AKASHA)
  return {
    pipelines: held(rowsOf(root, PIPELINE, PIPELINE_KEYS), pipelineIn),
    workflows: held(rowsOf(root, WORKFLOW, WORKFLOW_KEYS), workflowIn),
    steps: held(rowsOf(root, STEP, STEP_KEYS), stepIn),
  }
}

function statesSomething(one: unknown): boolean {
  if (one === null || typeof one !== "object" || Array.isArray(one)) return false
  return Object.keys(one as Record<string, unknown>).length > 0
}

export function definitionReader(roots: Roots): (stepSeq: string) => boolean {
  const seen = new Map<string, boolean>()
  return (stepSeq) => {
    const known = seen.get(stepSeq)
    if (known !== undefined) return known
    const at = whereFor(roots, STEP, stepSeq)
    const stands = at === null ? false : statesSomething(readUncommitted(at.path)?.definition)
    seen.set(stepSeq, stands)
    return stands
  }
}

export interface Kin {
  readonly pipelineBySeq: ReadonlyMap<string, Pipeline>
  readonly workflowBySeq: ReadonlyMap<string, Workflow>
  readonly pipelinesByBranch: ReadonlyMap<string, readonly Pipeline[]>
  readonly workflowsByPipeline: ReadonlyMap<string, readonly Workflow[]>
  readonly stepsByWorkflow: ReadonlyMap<string, readonly Step[]>
}

function grouped<T>(
  items: readonly T[],
  by: (one: T) => string
): ReadonlyMap<string, readonly T[]> {
  const out = new Map<string, T[]>()
  for (const one of items) {
    const key = by(one)
    const list = out.get(key) ?? []
    list.push(one)
    out.set(key, list)
  }
  return out
}

export function kinOf(snapshot: Snapshot): Kin {
  const pipelineBySeq = new Map<string, Pipeline>()
  for (const one of snapshot.pipelines) pipelineBySeq.set(one.seq, one)
  const workflowBySeq = new Map<string, Workflow>()
  for (const one of snapshot.workflows) workflowBySeq.set(one.seq, one)
  return {
    pipelineBySeq,
    workflowBySeq,
    pipelinesByBranch: grouped(snapshot.pipelines, (one) => one.branch),
    workflowsByPipeline: grouped(snapshot.workflows, (one) => one.pipelineSeq),
    stepsByWorkflow: grouped(snapshot.steps, (one) => one.workflowSeq),
  }
}
