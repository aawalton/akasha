import type { Answer } from "@akasha/command-system/calling"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import {
  aloneIn,
  answering,
  asJson,
  countOf,
  JSON_SAID,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../pipeline-answering/pipeline-answering.module.code.ts"
import { listStepRunsByName } from "../pipeline-page-reading/pipeline-page-reading.module.code.ts"
import {
  renderStepCostTsv,
  type StepRun,
  summarizeRuns,
  toSeconds,
} from "../step-cost-summary/step-cost-summary.module.code.ts"
import { computeDurationMs } from "../step-row-format/step-row-format.module.code.ts"

const LIMIT = "--limit"

const VALUED = [LIMIT]

const SWITCHES = [JSON_SAID]

const MOST_RUNS = 200

const DEFAULT_LIMIT = 20

export type Read = {
  readonly stepName: string
  readonly limit: number
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const alone = aloneIn(said, "the step")
  if (typeof alone === "object" && alone !== null) return alone
  const refusals: string[] = []
  if (alone === null) refusals.push("this names the step to time, and nothing did")
  const limit = countOf(said.named[LIMIT], LIMIT, MOST_RUNS)
  if (typeof limit === "object" && limit !== null) refusals.push(...limit.refused)
  if (refusals.length > 0) return { refused: refusals }
  return {
    stepName: alone ?? "",
    limit: typeof limit === "number" ? limit : DEFAULT_LIMIT,
    json: said.flags.has(JSON_SAID),
  }
}

function timed(read: Read): Answer {
  const rows = listStepRunsByName(resolveRoots(), {
    stepName: read.stepName,
    limit: read.limit,
  })
  const runs: readonly StepRun[] = rows.map((row) => {
    const durationMs = computeDurationMs(row.startedAt, row.completedAt)
    return {
      pipelineSeq: row.pipelineSeq,
      branch: row.branch,
      workflowName: row.workflowName,
      status: row.status,
      durationMs,
      stepSeconds: toSeconds(durationMs),
      startedAt: row.startedAt,
    }
  })
  const summary = summarizeRuns(read.stepName, runs)
  if (read.json) return asJson({ summary, runs })
  return told(renderStepCostTsv(summary, runs).split("\n"))
}

export async function pipelineStepCost(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => timed(read))
}
