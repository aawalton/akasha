import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const overwhereIvSpeciesHeldSpecies = {
  id: "01a0f1ba-b381-7123-b35b-7d6056efc4ed",
  type: "page-type/relation-property",
  slug: "overwhere-iv-species-held-species",
  propertySlug: "species",
  definition: "the world's species a species holding in Overwhere IV names",
  targetPageType: "page-type/world-species",
  types: "ts",
} as const satisfies RelationProperty
