import type { Answer } from "@akasha/command-system/calling"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import {
  getPipelineBySeq,
  listWorkflowsForPipeline,
  optionalString,
} from "@tools/lib/pipeline-pages/read"
import {
  aloneIn,
  answering,
  asJson,
  JSON_SAID,
  oneCell,
  type Reading,
  refusedBy,
  seqOf,
  told,
  wordsIn,
} from "../pipeline-answering/pipeline-answering.module.code.ts"

const STATUS = "--status"

const VALUED = [STATUS]

const SWITCHES = [JSON_SAID]

const UNAVAILABLE = "unavailable"

export type Read = {
  readonly seq: number
  readonly status: string | undefined
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const alone = aloneIn(said, "the pipeline's seq")
  if (typeof alone === "object" && alone !== null) return alone
  const seq = seqOf(alone)
  if (typeof seq === "object") return seq
  return { seq, status: said.named[STATUS], json: said.flags.has(JSON_SAID) }
}

export type Workflow = {
  readonly name: string | undefined
  readonly kind: string | undefined
  readonly status: string | undefined
  readonly failedSteps: readonly string[] | null
  readonly blockedSteps: readonly string[] | null
  readonly createdAt: string | undefined
  readonly updatedAt: string | undefined
  readonly skipReason: string | undefined
  readonly failedDependency: string | undefined
}

export function stepNames(value: unknown): readonly string[] | null {
  if (!Array.isArray(value)) return null
  return value.filter((one): one is string => typeof one === "string")
}

export function namesCell(names: readonly string[] | null): string {
  return names === null ? UNAVAILABLE : names.map(oneCell).join(",")
}

export function workflowRow(one: Workflow): string {
  const reason = one.skipReason ?? one.failedDependency
  return [
    one.name ?? "",
    one.kind ?? "",
    one.status ?? "",
    namesCell(one.failedSteps),
    namesCell(one.blockedSteps),
    reason === undefined ? "" : oneCell(reason),
  ].join("\t")
}

function listed(read: Read): Answer {
  const roots = resolveRoots()
  getPipelineBySeq(roots, read.seq)
  const rows = listWorkflowsForPipeline(roots, {
    pipelineSeq: read.seq,
    ...(read.status === undefined ? {} : { status: read.status }),
  })
  const projected: readonly Workflow[] = rows.map((row) => ({
    name: optionalString(row, "slug"),
    kind: optionalString(row, "kind"),
    status: optionalString(row, "status"),
    failedSteps: stepNames(row["failedSteps"]),
    blockedSteps: stepNames(row["blockedSteps"]),
    createdAt: optionalString(row, "createdAt"),
    updatedAt: optionalString(row, "updatedAt"),
    skipReason: optionalString(row, "skipReason"),
    failedDependency: optionalString(row, "failedDependency"),
  }))
  if (read.json) return asJson(projected)
  return told(projected.map(workflowRow))
}

export async function pipelineWorkflows(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => listed(read))
}
