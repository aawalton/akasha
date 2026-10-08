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
  category: "temper-skill-line-category/character-class",
  class: "temper-class/sorcerer",
  hashPlace: 13,
  createdAt: "2026-05-26T01:18:50.283Z",
  updatedAt: "2026-09-26T15:39:49.000Z",
} as const satisfies TemperSkillLine
