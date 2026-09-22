import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const craftBlacksmithing = {
  id: "019e61dc-f1e2-7613-897e-7be723200280",
  type: "page-type/temper-skill-line",
  slug: "craft-blacksmithing",
  title: "Blacksmithing",
  key: "craft-blacksmithing",
  displayOrder: 57,
  esoSkillLineId: 79,
  maxRank: 50,
  category: "temper-skill-line-category/craft",
} as const satisfies TemperSkillLine
