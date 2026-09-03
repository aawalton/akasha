import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type StepRelaunchNotBefore = string

export const stepRelaunchNotBefore = {
  id: "01a06950-236c-7f06-a7f4-af85d70f590b",
  pageTypeSlug: "instant-property",
  slug: "step-relaunch-not-before",
  propertySlug: "relaunch-not-before",
  definition: "the time before which the step must not be launched again",
} as const satisfies InstantProperty
