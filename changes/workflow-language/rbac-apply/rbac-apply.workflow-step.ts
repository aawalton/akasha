import type { WorkflowStep } from "../workflow-steps/workflow-step.page-type.ts"

export const rbacApply = {
  id: "01a07740-d031-714c-ac83-463fb6c4cf3d",
  pageTypeSlug: "workflow-step",
  slug: "rbac-apply",
  definition: "a step putting a namespace's role profiles and their bindings onto the cluster",
  code: "ts",
} as const satisfies WorkflowStep
