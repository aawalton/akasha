import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowSkipReason = string

export const workflowSkipReason = {
  id: "01a06950-236c-74a6-aa0a-b04662ee1616",
  pageTypeSlug: "text-property",
  slug: "workflow-skip-reason",
  propertySlug: "skip-reason",
  definition: "why this workflow was skipped",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
