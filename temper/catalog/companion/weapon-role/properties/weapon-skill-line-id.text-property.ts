import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const weaponSkillLineId = {
  id: "01a05fcd-aed2-704d-9ca2-b1d66e3f79e7",
  type: "page-type/text-property",
  slug: "weapon-skill-line-id",
  propertySlug: "weapon-skill-line-id",
  definition: "a weapon pairing's skill line",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
