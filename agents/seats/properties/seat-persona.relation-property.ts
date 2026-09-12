import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const seatPersona = {
  id: "01a06d69-cfb7-7d3a-a37e-094805ef6f45",
  type: "relation-property",
  slug: "seat-persona",
  propertySlug: "persona",
  definition: "the persona a seat is held by",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
