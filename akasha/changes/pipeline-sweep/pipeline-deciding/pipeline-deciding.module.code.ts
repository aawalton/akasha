import {
  DISPATCHING,
  FAILED,
  MAIN_BRANCH,
  OVERTAKEN,
  PASSED,
  PENDING,
  PIPELINE,
  PIPELINE_TERMINAL,
  RUNNING,
  UNDERWAY,
  WORKFLOW_NEGATIVE,
  WORKFLOW_TERMINAL,
} from "@akasha/pipeline-sweep/pipeline-page-statuses"
import type { Pipeline, Workflow } from "@akasha/pipeline-sweep/pipeline-row-entities"
import { type Effect, transition } from "../sweep-effects/sweep-effects.module.code.ts"

function heldBehindOnMain(pipeline: Pipeline, sameBranch: readonly Pipeline[]): boolean {
  if (pipeline.branch !== MAIN_BRANCH) return false
  return sameBranch.some(
    (one) => Number(one.seq) < Number(pipeline.seq) && UNDERWAY.has(one.status)
  )
}

function rollUp(pipeline: Pipeline, workflows: readonly Workflow[]): readonly Effect[] {
  const settled =
    workflows.length > 0 && workflows.every((one) => WORKFLOW_TERMINAL.has(one.status))
  const anyNegative = workflows.some((one) => WORKFLOW_NEGATIVE.has(one.status))
  const anyMoved = workflows.some(
    (one) => one.status === RUNNING || one.status === PASSED || one.status === FAILED
  )
  const from = pipeline.status

  if (settled && anyNegative) {
    return [
      transition(
        PIPELINE,
        pipeline.seq,
        from,
        FAILED,
        `pipeline.${from}-to-failed.workflow-failed`
      ),
    ]
  }
  if (settled) {
    return [
      transition(PIPELINE, pipeline.seq, from, PASSED, `pipeline.${from}-to-passed.workflows-done`),
    ]
  }
  if (from === DISPATCHING && anyMoved) {
    return [
      transition(
        PIPELINE,
        pipeline.seq,
        from,
        RUNNING,
        "pipeline.dispatching-to-running.workflow-running"
      ),
    ]
  }
  return []
}

export function decidePipeline(
  pipeline: Pipeline,
  workflows: readonly Workflow[],
  sameBranch: readonly Pipeline[]
): readonly Effect[] {
  if (PIPELINE_TERMINAL.has(pipeline.status)) return []

  if (pipeline.overtakenBySeq !== null) {
    return [
      transition(
        PIPELINE,
        pipeline.seq,
        pipeline.status,
        OVERTAKEN,
        "pipeline.any-to-overtaken.overtaken-by-seq-stands"
      ),
    ]
  }

  if (pipeline.status === PENDING) {
    if (workflows.length === 0) {
      return [
        transition(
          PIPELINE,
          pipeline.seq,
          PENDING,
          FAILED,
          "pipeline.pending-to-failed.no-workflows-chosen"
        ),
      ]
    }
    if (heldBehindOnMain(pipeline, sameBranch)) return []
    return [
      transition(
        PIPELINE,
        pipeline.seq,
        PENDING,
        DISPATCHING,
        "pipeline.pending-to-dispatching.workflows-stand"
      ),
    ]
  }

  if (UNDERWAY.has(pipeline.status)) return rollUp(pipeline, workflows)

  return []
}
