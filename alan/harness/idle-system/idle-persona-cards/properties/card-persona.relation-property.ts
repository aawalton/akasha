import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const cardPersona = {
  id: "01a06d59-446e-7c18-924f-2f3c7bc8f3e7",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "card-persona",
  propertySlug: "persona",
  definition: "the persona a card is of",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
