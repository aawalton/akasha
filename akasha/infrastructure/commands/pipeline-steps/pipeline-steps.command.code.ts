import type { Answer } from "@akasha/command-system/calling"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import {
  getPipelineBySeq,
  listStepsForPipeline,
  optionalNumber,
  optionalString,
} from "@tools/lib/pipeline-pages/read"
import {
  aloneIn,
  answering,
  asJson,
  JSON_SAID,
  type Reading,
  refusedBy,
  seqOf,
  told,
  wordsIn,
} from "../pipeline-answering/pipeline-answering.module.code.ts"
import { computeDurationMs, formatStepRow } from "../step-row-format/step-row-format.module.code.ts"

const WORKFLOW = "--workflow"

const STATUS = "--status"

const VALUED = [WORKFLOW, STATUS]

const SWITCHES = [JSON_SAID]

export type Read = {
  readonly seq: number
  readonly workflowName: string | undefined
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
  return {
    seq,
    workflowName: said.named[WORKFLOW],
    status: said.named[STATUS],
    json: said.flags.has(JSON_SAID),
  }
}

function listed(read: Read): Answer {
  const roots = resolveRoots()
  const pipeline = getPipelineBySeq(roots, read.seq)
  const rows = listStepsForPipeline(roots, {
    pipeline,
    ...(read.workflowName === undefined ? {} : { workflowName: read.workflowName }),
    ...(read.status === undefined ? {} : { status: read.status }),
  })
  const projected = rows.map((row) => {
    const startedAt = optionalString(row, "startedAt")
    const completedAt = optionalString(row, "completedAt")
    return {
      workflowName: row.workflowName,
      stepName: optionalString(row, "title"),
      status: optionalString(row, "status"),
      exitCode: optionalNumber(row, "exitCode"),
      durationMs: computeDurationMs(startedAt, completedAt),
      podName: optionalString(row, "containerName"),
      startedAt,
      completedAt,
      failReason: optionalString(row, "failureReason"),
      skipReason: optionalString(row, "skipReason"),
      admissionRejectedReason: optionalString(row, "launchRefusedReason"),
      blockedBy: optionalString(row, "blockedBy"),
      infraSignatureClass: optionalString(row, "infraSignatureClass"),
      dispatchWaitReason: optionalString(row, "dispatchWaitReason"),
      dispatchWaitNode: optionalString(row, "dispatchWaitNode"),
      dispatchWaitSince: optionalNumber(row, "dispatchWaitSince"),
    }
  })
  if (read.json) return asJson(projected)
  const nowMs = Date.now()
  return told(projected.map((one) => formatStepRow(one, nowMs)))
}

export async function pipelineSteps(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => listed(read))
}
