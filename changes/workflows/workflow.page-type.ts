import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { WorkflowAlwaysRuns } from "./properties/workflow-always-runs.boolean-property.ts"
import type { WorkflowChangedFiles } from "./properties/workflow-changed-files.text-property.ts"
import type { WorkflowDependsOn } from "./properties/workflow-depends-on.text-property.ts"
import type { WorkflowDeployedCommit } from "./properties/workflow-deployed-commit.text-property.ts"
import type { WorkflowDeployedInputsHash } from "./properties/workflow-deployed-inputs-hash.text-property.ts"
import type { WorkflowFailedDependency } from "./properties/workflow-failed-dependency.text-property.ts"
import type { WorkflowFailedSteps } from "./properties/workflow-failed-steps.text-property.ts"
import type { WorkflowInputsHash } from "./properties/workflow-inputs-hash.text-property.ts"
import type { WorkflowName } from "./properties/workflow-name.text-property.ts"
import type { WorkflowPipelineSeq } from "./properties/workflow-pipeline-seq.relation-property.ts"
import type { WorkflowRunKind } from "./properties/workflow-run-kind.select-property.ts"
import type { WorkflowSeq } from "./properties/workflow-seq.text-property.ts"
import type { WorkflowSkipReason } from "./properties/workflow-skip-reason.text-property.ts"
import type { WorkflowStatus } from "./properties/workflow-status.select-property.ts"
import type { WorkflowWhenBranch } from "./properties/workflow-when-branch.text-property.ts"

export type Workflow = Page & {
  seq: WorkflowSeq
  status: WorkflowStatus
  kind: WorkflowRunKind
  name?: WorkflowName
  pipelineSeq?: WorkflowPipelineSeq
  alwaysRuns?: WorkflowAlwaysRuns
  whenBranch?: WorkflowWhenBranch
  changedFiles?: readonly WorkflowChangedFiles[]
  dependsOn?: readonly WorkflowDependsOn[]
  failedSteps?: readonly WorkflowFailedSteps[]
  failedDependency?: WorkflowFailedDependency
  inputsHash?: WorkflowInputsHash
  deployedCommit?: WorkflowDeployedCommit
  deployedInputsHash?: WorkflowDeployedInputsHash
  skipReason?: WorkflowSkipReason
}

export const workflow = {
  id: "01a01b95-f711-7000-82a2-cc7b813e1feb",
  pageTypeSlug: "page-type",
  slug: "workflow",
  definition: "one run of a named group of steps",
  pluralSlug: "workflows",
  extendsSlug: "page-type/page",
  mortal: true,
  nextSeq: 1117,
  partSlugs: [
    "boolean-property/workflow-always-runs",
    "relation-property/workflow-pipeline-seq",
    "select-property/workflow-run-kind",
    "select-property/workflow-status",
    "text-property/workflow-changed-files",
    "text-property/workflow-depends-on",
    "text-property/workflow-deployed-commit",
    "text-property/workflow-deployed-inputs-hash",
    "text-property/workflow-failed-dependency",
    "text-property/workflow-failed-steps",
    "text-property/workflow-inputs-hash",
    "text-property/workflow-name",
    "text-property/workflow-seq",
    "text-property/workflow-skip-reason",
    "text-property/workflow-when-branch",
  ],
  properties: [
    { pagePropertySlug: "workflow-seq", required: true, many: false },
    { pagePropertySlug: "workflow-run-kind", required: true, many: false },
    { pagePropertySlug: "workflow-status", required: true, many: false },
    { pagePropertySlug: "workflow-name", required: false, many: false },
    { pagePropertySlug: "workflow-pipeline-seq", required: false, many: false },
    { pagePropertySlug: "workflow-always-runs", required: false, many: false },
    { pagePropertySlug: "workflow-when-branch", required: false, many: false },
    { pagePropertySlug: "workflow-changed-files", required: false, many: true, max: null },
    { pagePropertySlug: "workflow-depends-on", required: false, many: true, max: null },
    { pagePropertySlug: "workflow-failed-steps", required: false, many: true, max: null },
    { pagePropertySlug: "workflow-failed-dependency", required: false, many: false },
    { pagePropertySlug: "workflow-inputs-hash", required: false, many: false },
    { pagePropertySlug: "workflow-deployed-commit", required: false, many: false },
    { pagePropertySlug: "workflow-deployed-inputs-hash", required: false, many: false },
    { pagePropertySlug: "workflow-skip-reason", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A workflow names separately what must run before the workflow and what pulls the workflow in.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow may name both what must run before it and what pulls it in.",
    },
  ],
} as const satisfies PageType
