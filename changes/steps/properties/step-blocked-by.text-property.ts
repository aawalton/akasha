import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepBlockedBy = string

export const stepBlockedBy = {
  id: "01a06950-236b-725c-8948-ad38a24f49cb",
  pageTypeSlug: "text-property",
  slug: "step-blocked-by",
  propertySlug: "blocked-by",
  definition: "what is holding the step back",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
