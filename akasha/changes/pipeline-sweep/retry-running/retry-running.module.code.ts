import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  FAILED,
  PENDING,
  PIPELINE,
  RUNNING,
  STEP,
  WORKFLOW,
} from "@akasha/pipeline-sweep/pipeline-page-statuses"
import type { Plan } from "../retry-deciding/retry-deciding.module.code.ts"
import { applyEffect, type Held, transition } from "../sweep-effects/sweep-effects.module.code.ts"

const STEP_HUSK: Readonly<Record<string, Held>> = {
  "dispatched-at": null,
  "dispatch-wait-reason": null,
  "dispatch-wait-node": null,
  "dispatch-wait-since": null,
  "never-fit-since": null,
  "container-name": null,
  "container-launch-attempted-at": null,
  "launch-attempts": null,
  "launch-refused-reason": null,
  "relaunch-not-before": null,
  "started-at": null,
  "completed-at": null,
  "exit-code": null,
  "failure-reason": null,
  "infra-failure-kind": null,
  "blocked-by": null,
  "skip-reason": null,
}

const WORKFLOW_HUSK: Readonly<Record<string, Held>> = {
  "failed-dependency": null,
  "failed-steps": null,
  "skip-reason": null,
}

export interface Landed {
  readonly stepsReset: number
  readonly workflowsReset: number
  readonly pipelineMoved: boolean
}

export function runRetry(roots: Roots, pipelineSeq: string, plan: Plan): Landed {
  let stepsReset = 0
  for (const one of plan.steps) {
    const moved = applyEffect(
      roots,
      transition(STEP, one.seq, one.status, PENDING, "retry.step-reset", STEP_HUSK)
    )
    if (moved) stepsReset += 1
  }

  let workflowsReset = 0
  for (const one of plan.workflows) {
    const moved = applyEffect(
      roots,
      transition(WORKFLOW, one.seq, one.status, PENDING, "retry.workflow-reset", WORKFLOW_HUSK)
    )
    if (moved) workflowsReset += 1
  }

  const pipelineMoved = applyEffect(
    roots,
    transition(PIPELINE, pipelineSeq, FAILED, RUNNING, "retry.pipeline-reset")
  )

  return { stepsReset, workflowsReset, pipelineMoved }
}
