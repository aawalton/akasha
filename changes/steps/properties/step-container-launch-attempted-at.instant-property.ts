import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type StepContainerLaunchAttemptedAt = string

export const stepContainerLaunchAttemptedAt = {
  id: "01a06950-236b-7287-92cb-6a549df4b630",
  pageTypeSlug: "instant-property",
  slug: "step-container-launch-attempted-at",
  propertySlug: "container-launch-attempted-at",
  definition: "when a launch of the step's container was last attempted",
} as const satisfies InstantProperty
