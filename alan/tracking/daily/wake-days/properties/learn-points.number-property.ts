import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LearnPoints = number

export const learnPoints = {
  id: "01a05fd8-c30f-7497-9e9c-7b9944500399",
  pageTypeSlug: "number-property",
  slug: "learn-points",
  propertySlug: "learn-points",
  definition: "the learning earned on a day",
  max: null,
} as const satisfies NumberProperty
