export const PIPELINE_STATUS_VALUES = [
  "pending",
  "dispatching",
  "running",
  "passed",
  "failed",
  "answered-elsewhere",
  "overtaken",
  "canceled",
] as const

export type PipelineStatus = (typeof PIPELINE_STATUS_VALUES)[number]

export const WORKFLOW_STATUS_VALUES = [
  "pending",
  "dispatching",
  "running",
  "passed",
  "failed",
  "blocked",
  "skipped",
  "answered-elsewhere",
  "overtaken",
  "canceled",
] as const

export type WorkflowStatus = (typeof WORKFLOW_STATUS_VALUES)[number]

export const STEP_STATUS_VALUES = [
  "pending",
  "dispatching",
  "launching",
  "running",
  "passed",
  "failed",
  "blocked",
  "skipped",
  "answered-elsewhere",
  "overtaken",
  "canceled",
] as const

export type StepStatus = (typeof STEP_STATUS_VALUES)[number]

export const MERGE_QUEUE_ENTRY_STATUS_VALUES = [
  "queued",
  "batched",
  "landed",
  "deployed",
  "deploy-failed",
  "ejected",
] as const

export type MergeQueueEntryStatus = (typeof MERGE_QUEUE_ENTRY_STATUS_VALUES)[number]

export const MERGE_QUEUE_BATCH_STATUS_VALUES = [
  "forming",
  "testing",
  "passed",
  "failed",
  "bisecting",
  "landing",
  "partly-landing",
  "landed",
  "deployed",
  "deploy-failed",
  "overtaken",
] as const

export type MergeQueueBatchStatus = (typeof MERGE_QUEUE_BATCH_STATUS_VALUES)[number]

export const ALL_PIPELINE_STATUSES: ReadonlySet<PipelineStatus> = new Set(PIPELINE_STATUS_VALUES)
export const ALL_WORKFLOW_STATUSES: ReadonlySet<WorkflowStatus> = new Set(WORKFLOW_STATUS_VALUES)
export const ALL_STEP_STATUSES: ReadonlySet<StepStatus> = new Set(STEP_STATUS_VALUES)
export const ALL_MERGE_QUEUE_ENTRY_STATUSES: ReadonlySet<MergeQueueEntryStatus> = new Set(
  MERGE_QUEUE_ENTRY_STATUS_VALUES
)
export const ALL_MERGE_QUEUE_BATCH_STATUSES: ReadonlySet<MergeQueueBatchStatus> = new Set(
  MERGE_QUEUE_BATCH_STATUS_VALUES
)

export const TERMINAL_PIPELINE_STATUSES: ReadonlySet<PipelineStatus> = new Set<PipelineStatus>([
  "passed",
  "failed",
  "answered-elsewhere",
  "overtaken",
  "canceled",
])

export const TERMINAL_WORKFLOW_STATUSES: ReadonlySet<WorkflowStatus> = new Set<WorkflowStatus>([
  "passed",
  "failed",
  "blocked",
  "skipped",
  "answered-elsewhere",
  "overtaken",
  "canceled",
])

export const TERMINAL_STEP_STATUSES: ReadonlySet<StepStatus> = new Set<StepStatus>([
  "passed",
  "failed",
  "blocked",
  "skipped",
  "answered-elsewhere",
  "overtaken",
  "canceled",
])

function setDifference<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): ReadonlySet<T> {
  const out = new Set<T>()
  for (const v of a) if (!b.has(v)) out.add(v)
  return out
}

export const NON_TERMINAL_PIPELINE_STATUSES: ReadonlySet<PipelineStatus> = setDifference(
  ALL_PIPELINE_STATUSES,
  TERMINAL_PIPELINE_STATUSES
)

export const NON_TERMINAL_WORKFLOW_STATUSES: ReadonlySet<WorkflowStatus> = setDifference(
  ALL_WORKFLOW_STATUSES,
  TERMINAL_WORKFLOW_STATUSES
)

export const NON_TERMINAL_STEP_STATUSES: ReadonlySet<StepStatus> = setDifference(
  ALL_STEP_STATUSES,
  TERMINAL_STEP_STATUSES
)

export const TERMINAL_STATUSES: ReadonlySet<string> = new Set<string>([
  ...TERMINAL_PIPELINE_STATUSES,
  ...TERMINAL_WORKFLOW_STATUSES,
  ...TERMINAL_STEP_STATUSES,
])

function statedAmong(values: readonly string[], value: unknown): boolean {
  return typeof value === "string" && values.includes(value)
}

export function isPipelineStatus(value: unknown): value is PipelineStatus {
  return statedAmong(PIPELINE_STATUS_VALUES, value)
}

export function isWorkflowStatus(value: unknown): value is WorkflowStatus {
  return statedAmong(WORKFLOW_STATUS_VALUES, value)
}

export function isStepStatus(value: unknown): value is StepStatus {
  return statedAmong(STEP_STATUS_VALUES, value)
}

export function isMergeQueueEntryStatus(value: unknown): value is MergeQueueEntryStatus {
  return statedAmong(MERGE_QUEUE_ENTRY_STATUS_VALUES, value)
}

export function isMergeQueueBatchStatus(value: unknown): value is MergeQueueBatchStatus {
  return statedAmong(MERGE_QUEUE_BATCH_STATUS_VALUES, value)
}

export function isTerminalStatus(status: string): boolean {
  return TERMINAL_STATUSES.has(status)
}

export const PIPELINE_PASSED: PipelineStatus = "passed"
export const WORKFLOW_PASSED: WorkflowStatus = "passed"
export const STEP_PASSED: StepStatus = "passed"

export const POSITIVE_WORKFLOW_STATUSES: ReadonlySet<WorkflowStatus> = new Set<WorkflowStatus>([
  "passed",
  "skipped",
])

export const NEGATIVE_WORKFLOW_STATUSES: ReadonlySet<WorkflowStatus> = new Set<WorkflowStatus>([
  "failed",
  "blocked",
  "answered-elsewhere",
])

export const NEGATIVE_STEP_STATUSES: ReadonlySet<StepStatus> = new Set<StepStatus>([
  "failed",
  "blocked",
  "answered-elsewhere",
])
