import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowFailedDependency = string

export const workflowFailedDependency = {
  id: "01a06950-236c-701e-9ca8-5da947c9e649",
  pageTypeSlug: "text-property",
  slug: "workflow-failed-dependency",
  propertySlug: "failed-dependency",
  definition: "the workflow it waited on that failed",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
