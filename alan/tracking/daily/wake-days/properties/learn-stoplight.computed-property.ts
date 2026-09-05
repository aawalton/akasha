import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type LearnStoplight = string

export const learnStoplight = {
  id: "01a0721c-cebd-7846-93a8-470678b43ca6",
  pageTypeSlug: "computed-property",
  slug: "learn-stoplight",
  propertySlug: "learn-stoplight",
  definition: "the rung the day's learn reached, as one colored light",
  holds: "text",
  code: "ts",
} as const satisfies ComputedProperty
