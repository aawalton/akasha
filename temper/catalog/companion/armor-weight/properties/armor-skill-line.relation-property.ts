import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const armorSkillLine = {
  id: "01a0df43-4d16-77ca-96b7-d5a3e4d3537e",
  type: "page-type/relation-property",
  slug: "armor-skill-line",
  propertySlug: "armor-skill-line-id",
  definition: "the companion line wearing enough of an armor weight opens",
  targetPageType: "page-type/temper-companion-skill-line",
  types: "ts",
} as const satisfies RelationProperty
