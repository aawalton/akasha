import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const towerSkillElement = {
  id: "01a0de18-0b70-73d2-8a38-9519764627da",
  type: "page-type/relation-property",
  slug: "tower-skill-element",
  propertySlug: "element",
  definition: "the element whose attunement biases a skill",
  targetPageType: "page-type/tower-element",
  types: "ts",
} as const satisfies RelationProperty
