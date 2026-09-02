import type { TextProperty } from "@akasha/pages-system/text-property"

export type WeaponSkillLineId = string

export const weaponSkillLineId = {
  id: "01a05fcd-aed2-704d-9ca2-b1d66e3f79e7",
  pageTypeSlug: "text-property",
  slug: "weapon-skill-line-id",
  propertySlug: "weapon-skill-line-id",
  definition: "the skill line a weapon pairing draws from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
