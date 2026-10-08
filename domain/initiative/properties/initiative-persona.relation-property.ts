import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const initiativePersona = {
  id: "01a06d59-446d-79b0-af7c-56fc8ec01122",
  type: "page-type/relation-property",
  slug: "initiative-persona",
  propertySlug: "persona",
  definition: "the persona whose work an initiative is",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-04T16:56:01.901Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
