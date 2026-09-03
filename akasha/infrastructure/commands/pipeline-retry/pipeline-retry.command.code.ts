import type { Answer } from "@akasha/command-system/calling"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { type Reading as Decided, decideRetry } from "@akasha/pipeline-sweep/retry-deciding"
import { runRetry } from "@akasha/pipeline-sweep/retry-running"
import { kinOf, readSnapshot } from "@akasha/pipeline-sweep/sweep-page-reading"
import { servedTip } from "@tools/lib/served-tip"
import {
  aloneIn,
  answering,
  DATA,
  JSON_SAID,
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

const WORKFLOW = "--workflow"

const VALUED = [WORKFLOW]

const SWITCHES = [JSON_SAID]

export type Read = {
  readonly seq: number
  readonly targetWorkflow: string | null
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
    targetWorkflow: said.named[WORKFLOW] ?? null,
    json: said.flags.has(JSON_SAID),
  }
}

export type Result =
  | {
      readonly outcome: "retried"
      readonly seq: string
      readonly workflows: readonly string[]
      readonly workflowsReset: number
      readonly stepsReset: number
    }
  | { readonly outcome: "refused" | "raced"; readonly reason: string }

export function resultSaid(result: Result, json: boolean): readonly string[] {
  if (json) return [JSON.stringify(result)]
  if (result.outcome !== "retried") {
    return [`outcome\t${result.outcome}`, `reason\t${result.reason}`]
  }
  return [
    "outcome\tretried",
    `seq\t${result.seq}`,
    `workflows\t${result.workflows.join(", ")}`,
    `workflowsReset\t${result.workflowsReset}`,
    `stepsReset\t${result.stepsReset}`,
  ]
}

function unretried(result: Result, json: boolean): Answer {
  return { report: [], refusals: resultSaid(result, json), code: DATA }
}

export function failureReading(roots: Roots, seq: number): (stepSeq: string) => string | null {
  let held: ReadonlyMap<string, string> | null = null
  return (stepSeq) => {
    if (held === null) {
      const found = new Map<string, string>()
      const pipeline = getPipelineBySeq(roots, seq)
      for (const row of listStepsForPipeline(roots, { pipeline })) {
        const at = optionalNumber(row, "seq")
        const why = optionalString(row, "failureReason")
        if (at !== undefined && why !== undefined) found.set(String(at), why)
      }
      held = found
    }
    return held.get(stepSeq) ?? null
  }
}

function retried(read: Read): Answer {
  const roots = resolveRoots()
  const said = String(read.seq)
  const kin = kinOf(readSnapshot(roots))
  const pipeline = kin.pipelineBySeq.get(said)
  if (pipeline === undefined) {
    return unretried(
      { outcome: "refused", reason: `no pipeline page stands at seq ${said}` },
      read.json
    )
  }
  const reading: Decided = {
    pipeline,
    workflows: kin.workflowsByPipeline.get(said) ?? [],
    stepsOf: (workflowSeq) => kin.stepsByWorkflow.get(workflowSeq) ?? [],
    failureOf: failureReading(roots, read.seq),
    branchTip: servedTip(rootFor(roots, AKASHA), pipeline.branch),
  }
  const decided = decideRetry(reading, read.targetWorkflow)
  if (decided.kind === "refusal") {
    return unretried({ outcome: "refused", reason: decided.reason }, read.json)
  }
  const landed = runRetry(roots, said, decided)
  if (!landed.pipelineMoved) {
    return unretried(
      {
        outcome: "raced",
        reason: `pipeline ${said} moved off \`failed\` while this retry was being planned`,
      },
      read.json
    )
  }
  return told(
    resultSaid(
      {
        outcome: "retried",
        seq: said,
        workflows: decided.workflows.map((one) => one.slug),
        workflowsReset: landed.workflowsReset,
        stepsReset: landed.stepsReset,
      },
      read.json
    )
  )
}

export async function pipelineRetry(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => retried(read))
}
