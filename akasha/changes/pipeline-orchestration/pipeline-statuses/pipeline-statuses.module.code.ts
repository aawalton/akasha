import {
  NON_TERMINAL_PIPELINE_STATUSES as PIPELINE_STATUSES_STILL_OPEN,
  NON_TERMINAL_STEP_STATUSES as STEP_STATUSES_STILL_OPEN,
  NON_TERMINAL_WORKFLOW_STATUSES as WORKFLOW_STATUSES_STILL_OPEN,
} from "@akasha/workflow-selection/ci-status-vocabulary"

export const NON_TERMINAL_PIPELINE_STATUSES: readonly string[] = [...PIPELINE_STATUSES_STILL_OPEN]

export const NON_TERMINAL_WORKFLOW_STATUSES: readonly string[] = [...WORKFLOW_STATUSES_STILL_OPEN]

export const NON_TERMINAL_STEP_STATUSES: readonly string[] = [...STEP_STATUSES_STILL_OPEN]

export const FAILED = "failed"

export const PASSED = "passed"

export const ANSWERED_ELSEWHERE = "answered-elsewhere"

export const CASCADABLE_STATUSES: ReadonlySet<string> = new Set([FAILED, "blocked"])
