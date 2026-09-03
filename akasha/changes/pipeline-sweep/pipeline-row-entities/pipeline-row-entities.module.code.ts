import type { Row } from "@akasha/pages-system-service/asking"
import { PENDING } from "../pipeline-page-statuses/pipeline-page-statuses.module.code.ts"

export interface Pipeline {
  readonly seq: string
  readonly status: string
  readonly branch: string
  readonly commit: string
  readonly overtakenBySeq: string | null
}

export interface Workflow {
  readonly seq: string
  readonly pipelineSeq: string
  readonly status: string
  readonly slug: string
  readonly dependsOn: readonly string[]
  readonly alwaysRuns: boolean
  readonly inputsHash: string | null
  readonly deployedCommit: string | null
  readonly deployedInputsHash: string | null
}

export interface Step {
  readonly seq: string
  readonly workflowSeq: string
  readonly status: string
  readonly title: string
  readonly dependsOn: readonly string[]
  readonly whenConditions: readonly string[]
  readonly alwaysRuns: boolean
  readonly containerName: string | null
  readonly launchAttempts: number
  readonly launchRefusedReason: string | null
  readonly launchAttemptedAt: number | null
  readonly relaunchNotBefore: number | null
  readonly dispatchedAt: number | null
  readonly dispatchWaitSince: number | null
  readonly dispatchWaitNode: string | null
}

export const PIPELINE_KEYS: readonly string[] = [
  "seq",
  "status",
  "branch",
  "commit",
  "overtakenBySeq",
]

export const WORKFLOW_KEYS: readonly string[] = [
  "seq",
  "pipelineSeq",
  "status",
  "slug",
  "dependsOn",
  "alwaysRuns",
  "inputsHash",
  "deployedCommit",
  "deployedInputsHash",
]

export const STEP_KEYS: readonly string[] = [
  "seq",
  "workflowSeq",
  "status",
  "title",
  "dependsOn",
  "whenConditions",
  "alwaysRuns",
  "containerName",
  "launchAttempts",
  "launchRefusedReason",
  "containerLaunchAttemptedAt",
  "relaunchNotBefore",
  "dispatchedAt",
  "dispatchWaitSince",
  "dispatchWaitNode",
]

function said(row: Row, key: string): string | null {
  const one = row[key]
  if (typeof one !== "string") return null
  return one.trim() === "" ? null : one
}

function flag(row: Row, key: string): boolean {
  return row[key] === true
}

function count(row: Row, key: string): number {
  const one = row[key]
  return typeof one === "number" && Number.isFinite(one) ? one : 0
}

export function momentOf(row: Row, key: string): number | null {
  const one = said(row, key)
  if (one === null) return null
  const ms = Date.parse(one)
  return Number.isFinite(ms) ? ms : null
}

function ordinal(row: Row, key: string): string | null {
  const one = said(row, key)
  return one !== null && /^\d+$/.test(one) ? one : null
}

function listed(row: Row, key: string): readonly string[] {
  const one = row[key]
  if (typeof one === "string") return [one]
  if (!Array.isArray(one)) return []
  return one.filter((each): each is string => typeof each === "string")
}

export function pipelineIn(row: Row): Pipeline | null {
  const seq = ordinal(row, "seq")
  if (seq === null) return null
  return {
    seq,
    status: said(row, "status") ?? PENDING,
    branch: said(row, "branch") ?? "",
    commit: said(row, "commit") ?? "",
    overtakenBySeq: ordinal(row, "overtakenBySeq"),
  }
}

export function workflowIn(row: Row): Workflow | null {
  const seq = ordinal(row, "seq")
  const pipelineSeq = ordinal(row, "pipelineSeq")
  if (seq === null || pipelineSeq === null) return null
  return {
    seq,
    pipelineSeq,
    status: said(row, "status") ?? PENDING,
    slug: said(row, "slug") ?? seq,
    dependsOn: listed(row, "dependsOn"),
    alwaysRuns: flag(row, "alwaysRuns"),
    inputsHash: said(row, "inputsHash"),
    deployedCommit: said(row, "deployedCommit"),
    deployedInputsHash: said(row, "deployedInputsHash"),
  }
}

export function stepIn(row: Row): Step | null {
  const seq = ordinal(row, "seq")
  const workflowSeq = ordinal(row, "workflowSeq")
  if (seq === null || workflowSeq === null) return null
  return {
    seq,
    workflowSeq,
    status: said(row, "status") ?? PENDING,
    title: said(row, "title") ?? seq,
    dependsOn: listed(row, "dependsOn"),
    whenConditions: listed(row, "whenConditions"),
    alwaysRuns: flag(row, "alwaysRuns"),
    containerName: said(row, "containerName"),
    launchAttempts: count(row, "launchAttempts"),
    launchRefusedReason: said(row, "launchRefusedReason"),
    launchAttemptedAt: momentOf(row, "containerLaunchAttemptedAt"),
    relaunchNotBefore: momentOf(row, "relaunchNotBefore"),
    dispatchedAt: momentOf(row, "dispatchedAt"),
    dispatchWaitSince: momentOf(row, "dispatchWaitSince"),
    dispatchWaitNode: said(row, "dispatchWaitNode"),
  }
}
