import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const heldSkill = {
  id: "01a10362-0c7c-7e04-9df8-e6bff42d988e",
  type: "page-type/relation-property",
  slug: "held-skill",
  propertySlug: "skill",
  definition: "the world's skill a skill held is a holding of",
  targetPageType: "page-type/world-skill",
  types: "ts",
} as const satisfies RelationProperty
