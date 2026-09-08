import type { WorkflowStep } from "../workflow-steps/workflow-step.page-type.ts"

export const deploy = {
  id: "01a07740-d031-7c8e-97f5-b547f30d893d",
  pageTypeSlug: "workflow-step",
  slug: "deploy",
  definition:
    "a step setting a deployment's image, verifying the rollout and undoing it on failure",
  code: "ts",
} as const satisfies WorkflowStep
