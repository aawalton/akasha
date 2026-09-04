import type { SelectProperty } from "@akasha/pages-system/select-property"

export const workflowStatus = {
  id: "01a06950-236c-7f8e-a6b1-e0752c422282",
  pageTypeSlug: "select-property",
  slug: "workflow-status",
  propertySlug: "status",
  definition: "where a workflow is between being minted and reaching its verdict",
  values: [
    "pending",
    "dispatching",
    "running",
    "passed",
    "failed",
    "blocked",
    "skipped",
    "answered-elsewhere",
    "overtaken",
  ],
} as const satisfies SelectProperty

export type WorkflowStatus = (typeof workflowStatus.values)[number]
