import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type OwnProgressInWords = number

export const ownProgressInWords = {
  id: "01a07231-dd65-7d2c-b7d0-3952fdd790d3",
  pageTypeSlug: "computed-property",
  slug: "own-progress-in-words",
  propertySlug: "own-progress-in-words",
  definition: "how much of the collection itself has been worked through, counted in words",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
