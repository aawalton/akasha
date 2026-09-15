import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const decisionGroup = {
  id: "01a04e11-9f98-7cf1-ac25-c66b4eea07c5",
  type: "page-type/relation-property",
  slug: "decision-group",
  propertySlug: "decision-group",
  definition: "a slug naming a decision group",
  targetPageType: "page-type/decision-group",
  types: "ts",
} as const satisfies RelationProperty
