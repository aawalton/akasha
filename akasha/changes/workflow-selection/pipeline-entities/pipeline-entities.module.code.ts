import type { InputsHash12 } from "@akasha/workflow-language/ci-identifiers"
import type {
  PipelineStatus,
  StepStatus,
  WorkflowStatus,
} from "../ci-status-vocabulary/ci-status-vocabulary.module.code.ts"

export type PipelineEntity = {
  id: string
  seq: number
  status: PipelineStatus
  branch: string
  changedFiles?: readonly string[]
  supersededBy?: number
  prevPassSkips?: readonly string[]
}

export type WorkflowEntity = {
  id: string
  seq?: number
  pipelineId: string
  pipelineSeq: number
  status: WorkflowStatus
  name: string
  kind?: string
  dependsOn?: readonly string[]
  whenBranch?: string
  changedFiles?: readonly string[]
  skipReason?: string
  failedDependency?: string
  isDisabled?: boolean
  alwaysRun?: boolean
  inputsHash?: InputsHash12
  deployedInputsHash?: InputsHash12
  deployedCommitSha?: string
}

export type StepEntity = {
  id: string
  seq?: number
  workflowId: string
  workflowSeq?: number
  pipelineSeq?: number
  status: StepStatus
  name: string
  dependsOn?: readonly string[]
  exitCode?: number
  completedAt?: string
  podName?: string
  blockedBy?: string
  skipReason?: string
  failReason?: string
  whenConditions?: WhenConditions
  dispatchedAt?: number
  podLaunchAttemptedAt?: number
  hasConfig?: boolean
  alwaysRun?: boolean
  launchAttempts?: number
  relaunchNotBeforeMs?: number
  admissionRejectedReason?: string
  launchedPodName?: string
  dispatchWaitReason?: string
  dispatchWaitNode?: string
  dispatchWaitSince?: number
}

export type WhenConditions = {
  status?: readonly StepStatus[]
  event?: string
}
