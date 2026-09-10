import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const initiativePersona = {
  id: "01a06d59-446d-79b0-af7c-56fc8ec01122",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "initiative-persona",
  propertySlug: "persona",
  definition: "the persona whose work an initiative is",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
