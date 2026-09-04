import type { Answer } from "@akasha/command-system/calling"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import {
  aloneIn,
  answering,
  asJson,
  figure,
  JSON_SAID,
  keyedLines,
  type Reading,
  refusedBy,
  seqOf,
  told,
  wordsIn,
} from "../pipeline-answering/pipeline-answering.module.code.ts"
import {
  getPipelineBySeq,
  listStepsForPipeline,
  optionalNumber,
  optionalString,
} from "../pipeline-page-reading/pipeline-page-reading.module.code.ts"
import { toSeconds } from "../step-cost-summary/step-cost-summary.module.code.ts"
import { computeSoloMs, type StepSpan } from "../step-solo-time/step-solo-time.module.code.ts"

const SWITCHES = [JSON_SAID]

export type Read = {
  readonly seq: number
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, [], SWITCHES)
  if ("refused" in said) return said
  const alone = aloneIn(said, "the pipeline's seq")
  if (typeof alone === "object" && alone !== null) return alone
  const seq = seqOf(alone)
  if (typeof seq === "object") return seq
  return { seq, json: said.flags.has(JSON_SAID) }
}

export function momentMs(value: string | undefined): number | undefined {
  if (value === undefined) return undefined
  const ms = Date.parse(value)
  return Number.isNaN(ms) ? undefined : ms
}

export function spanMs(from: string | undefined, to: string | undefined): number | undefined {
  const start = momentMs(from)
  const end = momentMs(to)
  if (start === undefined || end === undefined || end < start) return undefined
  return end - start
}

export function furthest(
  values: readonly (string | undefined)[],
  past: (one: number, held: number) => boolean
): string | undefined {
  let standing: number | undefined
  let answer: string | undefined
  for (const value of values) {
    const ms = momentMs(value)
    if (ms === undefined) continue
    if (standing === undefined || past(ms, standing)) {
      standing = ms
      answer = value
    }
  }
  return answer
}

function timed(read: Read): Answer {
  const roots = resolveRoots()
  const pipeline = getPipelineBySeq(roots, read.seq)
  const rows = listStepsForPipeline(roots, { pipeline })
  const spans: readonly StepSpan[] = rows.map((row) => ({
    startedAt: optionalString(row, "startedAt"),
    completedAt: optionalString(row, "completedAt"),
  }))
  const soloByIndex = computeSoloMs(spans)
  const steps = rows
    .map((row, index) => {
      const span = spans[index]
      const startedAt = span?.startedAt
      const completedAt = span?.completedAt
      const durationMs = spanMs(startedAt, completedAt)
      const soloMs = soloByIndex[index]
      return {
        workflowName: row.workflowName,
        stepName: optionalString(row, "title"),
        status: optionalString(row, "status"),
        durationMs,
        stepSeconds: toSeconds(durationMs),
        soloMs,
        soloSeconds: toSeconds(soloMs),
        dispatchedAt: optionalString(row, "dispatchedAt"),
        startedAt,
        completedAt,
      }
    })
    .sort((one, other) => (other.durationMs ?? -1) - (one.durationMs ?? -1))

  const firstDispatchedAt = furthest(
    steps.map((one) => one.dispatchedAt),
    (one, held) => one < held
  )
  const lastCompletedAt = furthest(
    steps.map((one) => one.completedAt),
    (one, held) => one > held
  )
  const wallClockMs = spanMs(firstDispatchedAt, lastCompletedAt)
  const totalStepMs = steps.reduce((sum, one) => sum + (one.durationMs ?? 0), 0)
  const totalSoloMs = steps.reduce((sum, one) => sum + (one.soloMs ?? 0), 0)
  const fields = {
    seq: optionalNumber(pipeline, "seq"),
    status: optionalString(pipeline, "status"),
    firstDispatchedAt,
    lastCompletedAt,
    wallClockMs,
    wallClockSeconds: toSeconds(wallClockMs),
    totalStepMs,
    totalStepSeconds: Math.round(totalStepMs / 100) / 10,
    totalSoloMs,
    totalSoloSeconds: Math.round(totalSoloMs / 100) / 10,
  }
  if (read.json) return asJson({ pipeline: fields, steps })
  const lines = keyedLines(Object.entries(fields))
  if (steps.length === 0) return told(lines)
  lines.push("")
  for (const one of steps) {
    lines.push(
      `${one.workflowName}\t${one.stepName ?? ""}\t${one.status ?? ""}\t` +
        `${figure(one.durationMs)}\t${figure(one.stepSeconds)}\t` +
        `${figure(one.soloMs)}\t${figure(one.soloSeconds)}`
    )
  }
  return told(lines)
}

export async function pipelinePerf(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => timed(read))
}
