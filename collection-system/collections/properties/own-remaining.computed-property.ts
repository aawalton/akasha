import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type OwnRemaining = number

export const ownRemaining = {
  id: "01a07231-dd65-7c1d-91f5-797951efdddd",
  pageTypeSlug: "computed-property",
  slug: "own-remaining",
  propertySlug: "own-remaining",
  definition: "how much of the collection itself is left to work through",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
