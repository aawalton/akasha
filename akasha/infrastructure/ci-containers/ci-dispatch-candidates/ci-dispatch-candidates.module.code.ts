import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { textAt } from "@akasha/pages-system/page-value"
import { asking, type Row } from "@akasha/pages-system-service/asking"
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

const STEP_KEYS: readonly string[] = [
  "seq",
  "title",
  "status",
  "dependsOn",
  "workflowSeq",
  "pipelineSeq",
  "dispatchWaitSince",
  "neverFitSince",
]

const WORKFLOW_KEYS: readonly string[] = ["seq", "slug", "kind", "status", "inputsHash"]

const PIPELINE_KEYS: readonly string[] = [
  "seq",
  "branch",
  "node",
  "status",
  "commit",
  "instructionsCommit",
]

class PagesUnread extends Error {
  readonly pageType: string
  readonly why: string
  constructor(pageType: string, why: string) {
    super(
      `the \`${pageType}\` pages went unread, so no page can be called present or missing: ${why}`
    )
    this.name = "PagesUnread"
    this.pageType = pageType
    this.why = why
  }
}

export type StepDefinitions = (stepSeq: string) => Readonly<Record<string, unknown>>

function listed(row: Row, key: string): readonly string[] {
  const one = row[key]
  if (typeof one === "string") return [one]
  if (!Array.isArray(one)) return []
  return one.filter((each): each is string => typeof each === "string")
}

function askedFor(
  roots: Roots,
  pageType: string,
  query: Omit<Parameters<typeof asking>[1], "pageTypeSlug">
): readonly Row[] {
  const asked = asking(rootFor(roots, AKASHA), { pageTypeSlug: pageType, ...query })
  if ("refused" in asked) throw new PagesUnread(pageType, asked.refused)
  return asked.rows
}

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

function byKey(rows: readonly Row[], key: string): Map<string, Row> {
  const held = new Map<string, Row>()
  for (const row of rows) {
    const named = textAt(row, key)
    if (named !== null && !held.has(named)) held.set(named, row)
  }
  return held
}

function unique(said: readonly (string | null)[]): readonly string[] {
  return [...new Set(said.filter((one): one is string => one !== null))]
}

function pagesBySeq(
  roots: Roots,
  pageType: string,
  keys: readonly string[],
  seqs: readonly string[]
): Map<string, Row> {
  if (seqs.length === 0) return new Map()
  return byKey(askedFor(roots, pageType, { where: { seq: { in: seqs } }, keys }), "seq")
}

function pipelineMaxRequests(
  roots: Roots,
  unboundPipelineSeqs: readonly string[],
  definitions: StepDefinitions
): Map<string, Requests> {
  const most = new Map<string, Requests>()
  if (unboundPipelineSeqs.length === 0) return most
  const rows = askedFor(roots, "step", {
    where: { pipelineSeq: { in: unboundPipelineSeqs } },
    keys: ["seq", "pipelineSeq"],
  })
  for (const row of rows) {
    const stepSeq = textAt(row, "seq")
    const pipelineSeq = textAt(row, "pipelineSeq")
    if (stepSeq === null || pipelineSeq === null) continue
    const asked = requestsOf(definitions(stepSeq))
    const held = most.get(pipelineSeq)
    most.set(pipelineSeq, held === undefined ? asked : largest(held, asked))
  }
  return most
}

export function scanDispatchingSteps(roots: Roots, limit: number): readonly Row[] {
  return askedFor(roots, "step", {
    where: { status: { is: DISPATCHING } },
    keys: STEP_KEYS,
    sortBy: "seq",
    limit,
  })
}

export async function enrich(
  roots: Roots,
  steps: readonly Row[],
  skipped: (line: string) => void,
  definitions: StepDefinitions
): Promise<readonly Candidate[]> {
  if (steps.length === 0) return []

  const workflows = pagesBySeq(
    roots,
    "workflow",
    WORKFLOW_KEYS,
    unique(steps.map((one) => textAt(one, "workflowSeq")))
  )
  const pipelines = pagesBySeq(
    roots,
    "pipeline",
    PIPELINE_KEYS,
    unique(steps.map((one) => textAt(one, "pipelineSeq")))
  )

  const unbound = unique(
    [...pipelines.values()]
      .filter((one) => !onMainBranch(textAt(one, "branch") ?? "") && textAt(one, "node") === null)
      .map((one) => textAt(one, "seq"))
  )
  const most = pipelineMaxRequests(roots, unbound, definitions)

  const out: Candidate[] = []
  for (const step of steps) {
    const stepSeq = textAt(step, "seq")
    if (stepSeq === null) {
      skipped("a dispatching step names no seq, so nothing addresses its page")
      continue
    }
    const workflowSeq = textAt(step, "workflowSeq")
    const pipelineSeq = textAt(step, "pipelineSeq")
    if (workflowSeq === null || pipelineSeq === null) {
      skipped(`step ${stepSeq} names no workflowSeq or no pipelineSeq`)
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
    const workflowStatus = textAt(workflow, "status")
    const pipelineStatus = textAt(pipeline, "status")
    if (workflowStatus === null || pipelineStatus === null) {
      skipped(`step ${stepSeq} sits under an ancestor with no status`)
      continue
    }
    const stepName = textAt(step, "title")
    if (stepName === null) {
      skipped(`step ${stepSeq} has no title, and its title is the name its container carries`)
      continue
    }
    const definition = definitions(stepSeq)
    const requests = requestsOf(definition)
    out.push({
      stepSeq,
      stepName,
      dependsOn: listed(step, "dependsOn"),
      workflowSeq,
      workflowSlug: textAt(workflow, "slug") ?? "unknown",
      workflowKind: textAt(workflow, "kind") ?? "unknown",
      workflowStatus,
      pipelineSeq,
      pipelineStatus,
      pipelineBranch: textAt(pipeline, "branch") ?? "",
      pipelineCommit: textAt(pipeline, "commit") ?? "",
      pipelineInstructionsCommit: textAt(pipeline, "instructionsCommit") ?? "",
      inputsHash: textAt(workflow, "inputsHash"),
      assignedNode: textAt(pipeline, "node"),
      definition,
      requests,
      pipelineMaxRequests: most.get(pipelineSeq) ?? requests,
      dispatchWaitSince: momentOf(textAt(step, "dispatchWaitSince")),
      neverFitSince: momentOf(textAt(step, "neverFitSince")),
    })
  }
  return out
}
