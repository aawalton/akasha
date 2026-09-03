import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type WorkflowAlwaysRuns = boolean

export const workflowAlwaysRuns = {
  id: "01a06950-236c-7f4d-9d66-1d964f43173b",
  pageTypeSlug: "boolean-property",
  slug: "workflow-always-runs",
  propertySlug: "always-runs",
  definition: "whether a workflow runs whatever the branch changed",
} as const satisfies BooleanProperty
