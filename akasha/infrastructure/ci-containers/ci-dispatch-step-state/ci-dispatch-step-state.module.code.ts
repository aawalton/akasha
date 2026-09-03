import { patchPage, patchState } from "@akasha/markdown-pages/page-write"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { takeStepIfStatus } from "@tools/lib/take-step-status"
import { DISPATCHING } from "../ci-dispatch-candidates/ci-dispatch-candidates.module.code.ts"

export const CAPACITY_WAIT_REASON = "node-capacity"

export const CLUSTER_WAIT_REASON = "cluster-capacity"

export const NEVER_FIT_EXIT_CODE = 1

const CLEARED_WAIT = {
  "dispatch-wait-reason": null,
  "dispatch-wait-node": null,
  "dispatch-wait-since": null,
} as const

export function recordAssignedNode(roots: Roots, pipelineSeq: string, node: string): void {
  patchPage(roots, "pipeline", pipelineSeq, { node })
}

export function recordDispatchWait(
  roots: Roots,
  stepSeq: string,
  node: string,
  since: string | null,
  clearNeverFit: boolean
): void {
  patchState(roots, "step", stepSeq, {
    ...(since === null
      ? {}
      : {
          "dispatch-wait-reason": CAPACITY_WAIT_REASON,
          "dispatch-wait-node": node,
          "dispatch-wait-since": since,
        }),
    ...(clearNeverFit ? { "never-fit-since": null } : {}),
  })
}

export function recordClusterWait(roots: Roots, stepSeq: string, since: string): void {
  patchState(roots, "step", stepSeq, {
    "dispatch-wait-reason": CLUSTER_WAIT_REASON,
    "dispatch-wait-since": since,
  })
}

export function recordNeverFitWait(
  roots: Roots,
  stepSeq: string,
  since: string | null,
  clearDispatchWait: boolean
): void {
  patchState(roots, "step", stepSeq, {
    ...(since === null ? {} : { "never-fit-since": since }),
    ...(clearDispatchWait ? CLEARED_WAIT : {}),
  })
}

export function takeToLaunching(
  roots: Roots,
  stepSeq: string,
  containerName: string,
  at: string
): boolean {
  return takeStepIfStatus(roots, stepSeq, DISPATCHING, {
    status: "launching",
    "container-name": containerName,
    "container-launch-attempted-at": at,
    "never-fit-since": null,
    ...CLEARED_WAIT,
  })
}

export function takeToFailed(roots: Roots, stepSeq: string, reason: string): boolean {
  return takeStepIfStatus(roots, stepSeq, DISPATCHING, {
    status: "failed",
    "exit-code": NEVER_FIT_EXIT_CODE,
    "failure-reason": reason,
  })
}
