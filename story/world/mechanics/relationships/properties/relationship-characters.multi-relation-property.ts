import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const relationshipCharacters = {
  id: "01a0de40-70c2-72d8-976d-f94658f84984",
  type: "page-type/multi-relation-property",
  slug: "relationship-characters",
  propertySlug: "characters",
  definition: "every character a relationship is between",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies MultiRelationProperty
