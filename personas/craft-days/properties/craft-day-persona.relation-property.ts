import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const craftDayPersona = {
  id: "01a06d64-245e-7283-aa0e-ca4eda4dd326",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "craft-day-persona",
  propertySlug: "persona",
  definition: "the persona who did the crafting on a day",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
