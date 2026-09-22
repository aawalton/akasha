import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const ownRemaining = {
  id: "01a07231-dd65-7c1d-91f5-797951efdddd",
  type: "page-type/computed-property",
  slug: "own-remaining",
  propertySlug: "own-remaining",
  definition: "how much of the collection itself is left",
  holds: "number",
  code: "ts",
  types: "ts",
} as const satisfies ComputedProperty
