import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const wardenGreenBalance = {
  id: "019e61dc-f1b7-710f-9e2c-b40dff0f1f64",
  type: "page-type/temper-skill-line",
  slug: "warden-green-balance",
  title: "Green Balance",
  key: "warden-green-balance",
  displayOrder: 2,
  esoSkillLineId: 128,
  maxRank: 50,
  category: "temper-skill-line-category/character-class",
  class: "temper-class/warden",
} as const satisfies TemperSkillLine
