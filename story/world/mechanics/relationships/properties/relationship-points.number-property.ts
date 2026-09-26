import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const relationshipPoints = {
  id: "01a0de40-70c2-76b2-a0d8-17d3b2214ed1",
  type: "page-type/number-property",
  slug: "relationship-points",
  propertySlug: "relationship-points",
  definition: "the points a relationship has earned in play",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
