import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type LearnStoplight = string

export const learnStoplight = {
  id: "01a0721c-cebd-7846-93a8-470678b43ca6",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "learn-stoplight",
  propertySlug: "learn-stoplight",
  definition: "the rung the day's learn reached, as one colored light",
  holds: "text",
  code: "ts",
} as const satisfies ComputedProperty
