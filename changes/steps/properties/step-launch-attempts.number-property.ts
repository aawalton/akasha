import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StepLaunchAttempts = number

export const stepLaunchAttempts = {
  id: "01a06950-236c-7eb5-bf84-35200db05bab",
  pageTypeSlug: "number-property",
  slug: "step-launch-attempts",
  propertySlug: "launch-attempts",
  definition: "how many times launching the step's container has been tried",
  max: null,
} as const satisfies NumberProperty
