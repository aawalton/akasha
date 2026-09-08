import type { WorkflowStep } from "../workflow-steps/workflow-step.page-type.ts"

export const sopsDecrypt = {
  id: "01a07740-d031-71a9-a797-ffe0d2219c1e",
  pageTypeSlug: "workflow-step",
  slug: "sops-decrypt",
  definition: "a step decrypting a sops file and applying what it holds",
  code: "ts",
} as const satisfies WorkflowStep
