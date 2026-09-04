import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type StepCompletedAt = string

export const stepCompletedAt = {
  id: "01a06950-236b-7397-9905-b4c31242d4ca",
  pageTypeSlug: "instant-property",
  slug: "step-completed-at",
  propertySlug: "completed-at",
  definition: "when a step's container reported the verdict it finished with",
} as const satisfies InstantProperty
