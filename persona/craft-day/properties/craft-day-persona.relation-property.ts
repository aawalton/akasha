import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const craftDayPersona = {
  id: "01a06d64-245e-7283-aa0e-ca4eda4dd326",
  type: "page-type/relation-property",
  slug: "craft-day-persona",
  propertySlug: "persona",
  definition: "the persona who did the crafting on a day",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-04T17:07:54.590Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
