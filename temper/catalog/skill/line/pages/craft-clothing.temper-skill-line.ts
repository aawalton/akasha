import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const craftClothing = {
  id: "019e61dc-f1e3-769e-8875-94e3d2b00291",
  type: "page-type/temper-skill-line",
  slug: "craft-clothing",
  title: "Clothing",
  key: "craft-clothing",
  displayOrder: 58,
  esoSkillLineId: 81,
  maxRank: 50,
  category: "temper-skill-line-category/craft",
} as const satisfies TemperSkillLine
