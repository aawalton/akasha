import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const encounterLocation = {
  id: "01a0c647-490d-7091-a8dc-abdae9f40279",
  type: "page-type/relation-property",
  slug: "encounter-location",
  propertySlug: "location",
  definition: "the place an encounter is set in",
  targetPageType: "page-type/game-location",
  types: "ts",
} as const satisfies RelationProperty
