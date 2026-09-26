import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const towerSkillAxis = {
  id: "01a0de18-0b6f-78c9-aa86-2ea95605c688",
  type: "page-type/text-property",
  slug: "tower-skill-axis",
  propertySlug: "axis",
  definition: "what getting better at a skill improves",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
