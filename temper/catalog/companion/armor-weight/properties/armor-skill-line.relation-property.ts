import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const armorSkillLine = {
  id: "01a0df43-4d16-77ca-96b7-d5a3e4d3537e",
  type: "page-type/relation-property",
  slug: "armor-skill-line",
  propertySlug: "armor-skill-line-id",
  definition: "the companion line wearing enough of an armor weight opens",
  targetPageType: "page-type/temper-companion-skill-line",
  types: "ts",
  createdAt: "2026-09-26T19:48:44.950Z",
  updatedAt: "2026-09-26T19:48:53.000Z",
} as const satisfies RelationProperty
