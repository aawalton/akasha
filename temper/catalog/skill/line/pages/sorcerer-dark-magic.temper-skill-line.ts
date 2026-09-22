import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const sorcererDarkMagic = {
  id: "019e61dc-f1ab-7caf-8c29-1210323134e6",
  type: "page-type/temper-skill-line",
  slug: "sorcerer-dark-magic",
  title: "Dark Magic",
  key: "sorcerer-dark-magic",
  displayOrder: 13,
  esoSkillLineId: 41,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "temper-class/sorcerer",
} as const satisfies TemperSkillLine
