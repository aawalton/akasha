import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const sorcererDarkMagic = {
  id: "01a05fce-297f-7a66-8304-c34231482323",
  pageTypeSlug: "temper-skill-line",
  slug: "sorcerer-dark-magic",
  title: "Dark Magic",
  key: "sorcerer-dark-magic",
  displayOrder: 13,
  esoSkillLineId: 41,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "sorcerer",
} as const satisfies TemperSkillLine
