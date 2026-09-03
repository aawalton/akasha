import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { StepAlwaysRuns } from "./properties/step-always-runs.boolean-property.ts"
import type { StepBlockedBy } from "./properties/step-blocked-by.text-property.ts"
import type { StepCompletedAt } from "./properties/step-completed-at.instant-property.ts"
import type { StepContainerLaunchAttemptedAt } from "./properties/step-container-launch-attempted-at.instant-property.ts"
import type { StepContainerName } from "./properties/step-container-name.text-property.ts"
import type { StepDependsOn } from "./properties/step-depends-on.text-property.ts"
import type { StepDispatchWaitNode } from "./properties/step-dispatch-wait-node.text-property.ts"
import type { StepDispatchWaitReason } from "./properties/step-dispatch-wait-reason.text-property.ts"
import type { StepDispatchWaitSince } from "./properties/step-dispatch-wait-since.instant-property.ts"
import type { StepDispatchedAt } from "./properties/step-dispatched-at.instant-property.ts"
import type { StepExitCode } from "./properties/step-exit-code.number-property.ts"
import type { StepFailureReason } from "./properties/step-failure-reason.text-property.ts"
import type { StepInfraFailureKind } from "./properties/step-infra-failure-kind.text-property.ts"
import type { StepLaunchAttempts } from "./properties/step-launch-attempts.number-property.ts"
import type { StepLaunchRefusedReason } from "./properties/step-launch-refused-reason.text-property.ts"
import type { StepNeverFitSince } from "./properties/step-never-fit-since.instant-property.ts"
import type { StepPipelineSeq } from "./properties/step-pipeline-seq.relation-property.ts"
import type { StepRelaunchNotBefore } from "./properties/step-relaunch-not-before.instant-property.ts"
import type { StepRemoteExecution } from "./properties/step-remote-execution.boolean-property.ts"
import type { StepSeq } from "./properties/step-seq.text-property.ts"
import type { StepSkipReason } from "./properties/step-skip-reason.text-property.ts"
import type { StepStartedAt } from "./properties/step-started-at.instant-property.ts"
import type { StepStatus } from "./properties/step-status.select-property.ts"
import type { StepTitle } from "./properties/step-title.text-property.ts"
import type { StepWhenConditions } from "./properties/step-when-conditions.text-property.ts"
import type { StepWorkflowSeq } from "./properties/step-workflow-seq.relation-property.ts"

export type Step = Page & {
  seq: StepSeq
  pipelineSeq?: StepPipelineSeq
  workflowSeq?: StepWorkflowSeq
  alwaysRuns?: StepAlwaysRuns
  blockedBy?: StepBlockedBy
  completedAt?: StepCompletedAt
  containerLaunchAttemptedAt?: StepContainerLaunchAttemptedAt
  containerName?: StepContainerName
  dependsOn?: StepDependsOn
  dispatchWaitNode?: StepDispatchWaitNode
  dispatchWaitReason?: StepDispatchWaitReason
  dispatchWaitSince?: StepDispatchWaitSince
  dispatchedAt?: StepDispatchedAt
  exitCode?: StepExitCode
  failureReason?: StepFailureReason
  infraFailureKind?: StepInfraFailureKind
  launchAttempts?: StepLaunchAttempts
  launchRefusedReason?: StepLaunchRefusedReason
  neverFitSince?: StepNeverFitSince
  relaunchNotBefore?: StepRelaunchNotBefore
  remoteExecution?: StepRemoteExecution
  skipReason?: StepSkipReason
  startedAt?: StepStartedAt
  status?: StepStatus
  title?: StepTitle
  whenConditions?: StepWhenConditions
}

export const step = {
  id: "01a06835-e289-76ba-ba1f-756dc641a23f",
  pageTypeSlug: "page-type",
  slug: "step",
  definition: "one run of commands in one container",
  pluralSlug: "steps",
  partSlugs: [
    "boolean-property/step-always-runs",
    "boolean-property/step-remote-execution",
    "instant-property/step-completed-at",
    "instant-property/step-container-launch-attempted-at",
    "instant-property/step-dispatch-wait-since",
    "instant-property/step-dispatched-at",
    "instant-property/step-never-fit-since",
    "instant-property/step-relaunch-not-before",
    "instant-property/step-started-at",
    "number-property/step-exit-code",
    "number-property/step-launch-attempts",
    "relation-property/step-pipeline-seq",
    "relation-property/step-workflow-seq",
    "select-property/step-status",
    "text-property/step-blocked-by",
    "text-property/step-container-name",
    "text-property/step-depends-on",
    "text-property/step-dispatch-wait-node",
    "text-property/step-dispatch-wait-reason",
    "text-property/step-failure-reason",
    "text-property/step-infra-failure-kind",
    "text-property/step-launch-refused-reason",
    "text-property/step-seq",
    "text-property/step-skip-reason",
    "text-property/step-title",
    "text-property/step-when-conditions",
  ],
  extendsSlug: "page-type/page",
  properties: [
    { pagePropertySlug: "step-seq", required: true, many: false },
    { pagePropertySlug: "step-pipeline-seq", required: false, many: false },
    { pagePropertySlug: "step-workflow-seq", required: false, many: false },
    { pagePropertySlug: "step-always-runs", required: false, many: false },
    { pagePropertySlug: "step-blocked-by", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "step-completed-at", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "step-container-launch-attempted-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "step-container-name", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "step-depends-on", required: false, many: true, max: null },
    {
      pagePropertySlug: "step-dispatch-wait-node",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pagePropertySlug: "step-dispatch-wait-reason",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pagePropertySlug: "step-dispatch-wait-since",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "step-dispatched-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "step-exit-code", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "step-failure-reason", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "step-infra-failure-kind",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "step-launch-attempts", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "step-launch-refused-reason",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "step-never-fit-since", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "step-relaunch-not-before",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pagePropertySlug: "step-remote-execution",
      required: false,
      many: false,
      default: "false",
      uncommitted: true,
    },
    { pagePropertySlug: "step-skip-reason", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "step-started-at", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "step-status",
      required: false,
      many: false,
      default: "pending",
      uncommitted: true,
    },
    { pagePropertySlug: "step-title", required: false, many: false },
    { pagePropertySlug: "step-when-conditions", required: false, many: true, max: null },
  ],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step carries a gate of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow may dispatch only some of the steps under it.",
    },
    {
      invariantKind: "departure",
      statement: "A step's page states what the step is and its sidecar what the step is doing.",
    },
    {
      invariantKind: "departure",
      statement: "A step runs on the cluster whatever machine drives the sweep.",
    },
  ],
} as const satisfies PageType
