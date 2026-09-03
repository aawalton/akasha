import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { PagesUnread } from "@tools/lib/file-pages"
import type { Values } from "@tools/lib/page-file-values"
import { answer, UNREACHED } from "@tools/lib/page-query"
import { listOf, textOf } from "@tools/lib/page-query-values"
import { onMainBranch } from "../ci-dispatch-placement/ci-dispatch-placement.module.code.ts"
import {
  type Candidate,
  DEFAULT_REQUESTS,
  isRecord,
  type Requests,
} from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"
import {
  parseCpuMillis,
  parseMemoryBytes,
} from "../ci-node-capacity/ci-node-capacity.module.code.ts"

export const DISPATCHING = "dispatching"

/**
 * A step's definition is the one thing a candidate needs that no page query answers: it is a
 * nested record in the markdown page's uncommitted sidecar, and every query path flattens it to
 * a string. The sidecar store lives outside akasha, so the runner hands this in rather than a
 * module here reaching for it.
 */
export type StepDefinitions = (stepSeq: string) => Readonly<Record<string, unknown>>

function momentOf(raw: string | null): number | null {
  if (raw === null) return null
  const ms = Date.parse(raw)
  return Number.isFinite(ms) ? ms : null
}

export function requestsOf(definition: Readonly<Record<string, unknown>>): Requests {
  const requests = isRecord(definition.resources) ? definition.resources.requests : undefined
  if (!isRecord(requests)) return DEFAULT_REQUESTS
  const cpu = typeof requests.cpu === "string" ? parseCpuMillis(requests.cpu) : 0
  const memory = typeof requests.memory === "string" ? parseMemoryBytes(requests.memory) : 0
  return {
    cpuMillis: cpu > 0 ? cpu : DEFAULT_REQUESTS.cpuMillis,
    memoryBytes: memory > 0 ? memory : DEFAULT_REQUESTS.memoryBytes,
  }
}

function largest(a: Requests, b: Requests): Requests {
  return {
    cpuMillis: Math.max(a.cpuMillis, b.cpuMillis),
    memoryBytes: Math.max(a.memoryBytes, b.memoryBytes),
  }
}

function byKey(rows: readonly { readonly values: Values }[], key: string): Map<string, Values> {
  const held = new Map<string, Values>()
  for (const row of rows) {
    const named = textOf(row.values, key)
    if (named !== null && !held.has(named)) held.set(named, row.values)
  }
  return held
}

function unique(said: readonly (string | null)[]): readonly string[] {
  return [...new Set(said.filter((one): one is string => one !== null))]
}

async function pagesBySeq(
  roots: Roots,
  pageType: string,
  seqs: readonly string[]
): Promise<Map<string, Values>> {
  if (seqs.length === 0) return new Map()
  const found = answer(roots, { pageType, where: [{ key: "seq", in: seqs }] })
  if (found === null) throw new PagesUnread(pageType, UNREACHED)
  return byKey(found.rows, "seq")
}

async function pipelineMaxRequests(
  roots: Roots,
  unboundPipelineSeqs: readonly string[],
  definitions: StepDefinitions
): Promise<Map<string, Requests>> {
  const most = new Map<string, Requests>()
  if (unboundPipelineSeqs.length === 0) return most
  const found = answer(roots, {
    pageType: "step",
    where: [{ key: "pipeline-seq", in: unboundPipelineSeqs }],
    keys: ["seq", "pipeline-seq"],
  })
  if (found === null) throw new PagesUnread("step", UNREACHED)
  for (const row of found.rows) {
    const stepSeq = textOf(row.values, "seq")
    const pipelineSeq = textOf(row.values, "pipeline-seq")
    if (stepSeq === null || pipelineSeq === null) continue
    const asked = requestsOf(definitions(stepSeq))
    const held = most.get(pipelineSeq)
    most.set(pipelineSeq, held === undefined ? asked : largest(held, asked))
  }
  return most
}

export function scanDispatchingSteps(roots: Roots, limit: number): readonly Values[] {
  const found = answer(roots, {
    pageType: "step",
    where: [{ key: "status", is: DISPATCHING }],
    sortBy: "seq",
    limit,
  })
  if (found === null) throw new PagesUnread("step", UNREACHED)
  return found.rows.map((row) => row.values)
}

export async function enrich(
  roots: Roots,
  steps: readonly Values[],
  skipped: (line: string) => void,
  definitions: StepDefinitions
): Promise<readonly Candidate[]> {
  if (steps.length === 0) return []

  const workflows = await pagesBySeq(
    roots,
    "workflow",
    unique(steps.map((one) => textOf(one, "workflow-seq")))
  )
  const pipelines = await pagesBySeq(
    roots,
    "pipeline",
    unique(steps.map((one) => textOf(one, "pipeline-seq")))
  )

  const unbound = unique(
    [...pipelines.values()]
      .filter((one) => !onMainBranch(textOf(one, "branch") ?? "") && textOf(one, "node") === null)
      .map((one) => textOf(one, "seq"))
  )
  const most = await pipelineMaxRequests(roots, unbound, definitions)

  const out: Candidate[] = []
  for (const step of steps) {
    const stepSeq = textOf(step, "seq")
    if (stepSeq === null) {
      skipped("a dispatching step names no seq, so nothing addresses its page")
      continue
    }
    const workflowSeq = textOf(step, "workflow-seq")
    const pipelineSeq = textOf(step, "pipeline-seq")
    if (workflowSeq === null || pipelineSeq === null) {
      skipped(`step ${stepSeq} names no workflow-seq or no pipeline-seq`)
      continue
    }
    const workflow = workflows.get(workflowSeq)
    const pipeline = pipelines.get(pipelineSeq)
    if (workflow === undefined || pipeline === undefined) {
      skipped(
        `step ${stepSeq} names workflow ${workflowSeq} and pipeline ${pipelineSeq}, and one of them is not there`
      )
      continue
    }
    const workflowStatus = textOf(workflow, "status")
    const pipelineStatus = textOf(pipeline, "status")
    if (workflowStatus === null || pipelineStatus === null) {
      skipped(`step ${stepSeq} sits under an ancestor with no status`)
      continue
    }
    const stepName = textOf(step, "title")
    if (stepName === null) {
      skipped(`step ${stepSeq} has no title, and its title is the name its container carries`)
      continue
    }
    const definition = definitions(stepSeq)
    const requests = requestsOf(definition)
    out.push({
      stepSeq,
      stepName,
      dependsOn: listOf(step, "depends-on"),
      workflowSeq,
      workflowSlug: textOf(workflow, "slug") ?? "unknown",
      workflowKind: textOf(workflow, "kind") ?? "unknown",
      workflowStatus,
      pipelineSeq,
      pipelineStatus,
      pipelineBranch: textOf(pipeline, "branch") ?? "",
      pipelineCommit: textOf(pipeline, "commit") ?? "",
      pipelineInstructionsCommit: textOf(pipeline, "instructions-commit") ?? "",
      inputsHash: textOf(workflow, "inputs-hash"),
      assignedNode: textOf(pipeline, "node"),
      definition,
      requests,
      pipelineMaxRequests: most.get(pipelineSeq) ?? requests,
      dispatchWaitSince: momentOf(textOf(step, "dispatch-wait-since")),
      neverFitSince: momentOf(textOf(step, "never-fit-since")),
    })
  }
  return out
}
