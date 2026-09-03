import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowDependsOn = string

export const workflowDependsOn = {
  id: "01a06950-236c-7cd3-960e-33f12127a361",
  pageTypeSlug: "text-property",
  slug: "workflow-depends-on",
  propertySlug: "depends-on",
  definition: "the workflows that must finish before this one starts",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
