import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepSkipReason = string

export const stepSkipReason = {
  id: "01a06950-236c-7006-aee5-69cc3f08fb01",
  pageTypeSlug: "text-property",
  slug: "step-skip-reason",
  propertySlug: "skip-reason",
  definition: "why the step was skipped",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
