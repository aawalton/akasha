import type { WorkflowStep } from "../workflow-steps/workflow-step.page-type.ts"

export const kubectlApply = {
  id: "01a07740-d031-75da-9087-c83a6f64b0da",
  pageTypeSlug: "workflow-step",
  slug: "kubectl-apply",
  definition: "a step applying manifests, either within a namespace or across the cluster",
  code: "ts",
} as const satisfies WorkflowStep
