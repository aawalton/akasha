import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type LearnLevel = number

export const learnLevel = {
  id: "01a0720f-5ad1-775d-a283-00b4de11a246",
  pageTypeSlug: "computed-property",
  slug: "learn-level",
  propertySlug: "learn-level",
  definition: "which of the four rungs the day's learn points reached",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
