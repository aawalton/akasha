import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const craftEnchanting = {
  id: "019e61dc-f1e4-7883-8757-c2abde68dc23",
  type: "page-type/temper-skill-line",
  slug: "craft-enchanting",
  title: "Enchanting",
  key: "craft-enchanting",
  displayOrder: 59,
  esoSkillLineId: 78,
  maxRank: 50,
  category: "temper-skill-line-category/craft",
} as const satisfies TemperSkillLine
