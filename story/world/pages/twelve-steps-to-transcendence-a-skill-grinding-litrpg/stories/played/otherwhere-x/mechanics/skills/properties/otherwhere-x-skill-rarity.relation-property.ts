import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const otherwhereXSkillRarity = {
  id: "01a0ea7c-4061-7e4e-93c3-f3e87aa13672",
  type: "page-type/relation-property",
  slug: "otherwhere-x-skill-rarity",
  propertySlug: "rarity",
  definition: "the rarity a skill held in Otherwhere X has reached",
  targetPageType: "page-type/world-rank",
  types: "ts",
} as const satisfies RelationProperty
