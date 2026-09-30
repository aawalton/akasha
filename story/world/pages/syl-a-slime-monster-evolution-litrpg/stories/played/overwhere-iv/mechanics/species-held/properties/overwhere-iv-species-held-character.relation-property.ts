import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const overwhereIvSpeciesHeldCharacter = {
  id: "01a0f1ba-b381-747a-9012-2ccfb4e3207b",
  type: "page-type/relation-property",
  slug: "overwhere-iv-species-held-character",
  propertySlug: "character",
  definition: "the character whose species a holding in Overwhere IV names",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
