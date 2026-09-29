import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const otherwhereXiSkillRank = {
  id: "01a0ea89-63a3-76b4-8dd0-7c697d9c3c9d",
  type: "page-type/text-property",
  slug: "otherwhere-xi-skill-rank",
  propertySlug: "rank",
  definition: "the rank a skill in Otherwhere XI has reached, from Novice to Master",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
