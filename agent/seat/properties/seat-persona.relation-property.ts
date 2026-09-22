import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const seatPersona = {
  id: "01a06d69-cfb7-7d3a-a37e-094805ef6f45",
  type: "page-type/relation-property",
  slug: "seat-persona",
  propertySlug: "persona",
  definition: "a seat's persona",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
