import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const alertPersona = {
  id: "01a06935-9779-7dc1-8aa1-cd00a3576c4b",
  type: "page-type/relation-property",
  slug: "alert-persona",
  propertySlug: "persona",
  definition: "an alert's persona",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
