import { valuesOfType } from "@akasha/indexes"
import type { Roots } from "@akasha/pages-system/markdown-page-at"

const STEP = "step"

const PIPELINE = "pipeline"

const SEQ = "seq"

const STATUS = "status"

const CONTAINER_NAME = "containerName"

const STARTED_AT = "startedAt"

export const EXIT_CODE = "exit-code"

export const FAILURE_REASON = "failure-reason"

export const INFRA_FAILURE_KIND = "infra-failure-kind"

export const LAUNCH_REFUSED_REASON = "launch-refused-reason"

export interface MatchedStep {
  readonly seq: string
  readonly status: string
  readonly startedAt: string | null
}

type Carried = Readonly<Record<string, unknown>>

function rootOf(roots: Roots): string {
  const at = roots[roots.target ?? "akasha"]
  if (at === undefined) {
    throw new Error("the roots name no akasha checkout, so the page index cannot be read")
  }
  return at
}

function saidAt(carried: Carried, key: string): string | null {
  const one = carried[key]
  if (typeof one === "string") return one === "" ? null : one
  if (typeof one === "number") return Number.isFinite(one) ? String(one) : null
  if (typeof one === "boolean") return String(one)
  return null
}

function carriedBy(roots: Roots, pageType: string): readonly Carried[] {
  const out: Carried[] = []
  for (const one of valuesOfType(rootOf(roots), pageType)) {
    const value: unknown = one.value
    if (typeof value === "object" && value !== null) out.push(value as Carried)
  }
  return out
}

export function stepsByContainerName(
  roots: Roots,
  containerNames: readonly string[]
): ReadonlyMap<string, MatchedStep> {
  const out = new Map<string, MatchedStep>()
  if (containerNames.length === 0) return out
  const wanted = new Set(containerNames)
  for (const carried of carriedBy(roots, STEP)) {
    const name = saidAt(carried, CONTAINER_NAME)
    const seq = saidAt(carried, SEQ)
    const status = saidAt(carried, STATUS)
    if (name === null || seq === null || status === null) continue
    if (!wanted.has(name) || out.has(name)) continue
    out.set(name, { seq, status, startedAt: saidAt(carried, STARTED_AT) })
  }
  return out
}

export function pipelineStatusBySeq(
  roots: Roots,
  seqs: readonly string[]
): ReadonlyMap<string, string> {
  const out = new Map<string, string>()
  if (seqs.length === 0) return out
  const wanted = new Set(seqs)
  for (const carried of carriedBy(roots, PIPELINE)) {
    const seq = saidAt(carried, SEQ)
    const status = saidAt(carried, STATUS)
    if (seq === null || status === null) continue
    if (!wanted.has(seq) || out.has(seq)) continue
    out.set(seq, status)
  }
  return out
}
