import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const alertPersona = {
  id: "01a06935-9779-7dc1-8aa1-cd00a3576c4b",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "alert-persona",
  propertySlug: "persona",
  definition: "the persona an alert is for",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
