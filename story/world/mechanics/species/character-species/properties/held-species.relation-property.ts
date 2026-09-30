import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const heldSpecies = {
  id: "01a0f20b-f5ff-7ee6-a732-5035e9cfe2ae",
  type: "page-type/relation-property",
  slug: "held-species",
  propertySlug: "species",
  definition: "the world's species a species held is a holding of",
  targetPageType: "page-type/world-species",
  types: "ts",
} as const satisfies RelationProperty
