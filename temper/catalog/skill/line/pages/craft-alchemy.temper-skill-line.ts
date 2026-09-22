import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const craftAlchemy = {
  id: "019e61dc-f1e1-746b-ba08-80b9ddb31bcf",
  type: "page-type/temper-skill-line",
  slug: "craft-alchemy",
  title: "Alchemy",
  key: "craft-alchemy",
  displayOrder: 56,
  esoSkillLineId: 77,
  maxRank: 50,
  category: "temper-skill-line-category/craft",
} as const satisfies TemperSkillLine
