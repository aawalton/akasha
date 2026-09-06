import type { WorkflowStep } from "../workflow-steps/workflow-step.page-type.ts"

export const sourceSync = {
  id: "01a07740-d031-75de-940a-4690062813fb",
  pageTypeSlug: "workflow-step",
  slug: "source-sync",
  definition: "a step syncing a deployment's source tree to a commit through its sync container",
  code: "ts",
} as const satisfies WorkflowStep
