import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepFailureReason = string

export const stepFailureReason = {
  id: "01a06950-236c-7a47-a742-50d38bef6253",
  pageTypeSlug: "text-property",
  slug: "step-failure-reason",
  propertySlug: "failure-reason",
  definition: "what went wrong, in full",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
