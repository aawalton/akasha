import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const armorPassive = {
  id: "01a0df43-4d16-7852-a27e-89da9c1154a2",
  type: "page-type/relation-property",
  slug: "armor-passive",
  propertySlug: "armor-passive-id",
  definition: "the companion passive that grows with each piece of an armor weight worn",
  targetPageType: "page-type/temper-companion-skill",
  types: "ts",
} as const satisfies RelationProperty
