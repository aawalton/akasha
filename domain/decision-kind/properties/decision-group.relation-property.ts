import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const decisionGroup = {
  id: "01a04e11-9f98-7cf1-ac25-c66b4eea07c5",
  type: "page-type/relation-property",
  slug: "decision-group",
  propertySlug: "decision-group",
  definition: "a slug naming a decision group",
  targetPageType: "page-type/decision-group",
  types: "ts",
  createdAt: "2026-08-29T15:09:32.952Z",
  updatedAt: "2026-09-15T18:11:04.000Z",
} as const satisfies RelationProperty
