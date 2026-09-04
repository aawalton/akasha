import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type StepStartedAt = string

export const stepStartedAt = {
  id: "01a06950-236c-778a-9da4-744ccd198763",
  pageTypeSlug: "instant-property",
  slug: "step-started-at",
  propertySlug: "started-at",
  definition: "when the step began running",
} as const satisfies InstantProperty
