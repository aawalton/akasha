import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const towerSkillElement = {
  id: "01a0de18-0b70-73d2-8a38-9519764627da",
  type: "page-type/relation-property",
  slug: "tower-skill-element",
  propertySlug: "element",
  definition: "the element whose attunement biases a skill",
  targetPageType: "page-type/tower-element",
  types: "ts",
  createdAt: "2026-09-26T14:21:52.880Z",
  updatedAt: "2026-09-26T14:21:57.000Z",
} as const satisfies RelationProperty
