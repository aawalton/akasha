import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowFailedSteps = string

export const workflowFailedSteps = {
  id: "01a06950-236c-728b-8d22-3fef52a3c733",
  pageTypeSlug: "text-property",
  slug: "workflow-failed-steps",
  propertySlug: "failed-steps",
  definition: "the steps of this workflow that failed",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
