import type { WorkflowStep } from "../workflow-steps/workflow-step.page-type.ts"

export const kubectlApply = {
  id: "01a06f10-7000-700b-b000b-9d4a2f6c000be1",
  pageTypeSlug: "workflow-step",
  slug: "kubectl-apply",
  definition: "a step applying manifests, either within a namespace or across the cluster",
  code: "ts",
} as const satisfies WorkflowStep
