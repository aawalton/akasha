import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const craftWoodworking = {
  id: "019e61dc-f1e8-723a-a073-c2f9bb4039c8",
  type: "page-type/temper-skill-line",
  slug: "craft-woodworking",
  title: "Woodworking",
  key: "craft-woodworking",
  displayOrder: 62,
  esoSkillLineId: 80,
  maxRank: 50,
  category: "temper-skill-line-category/craft",
} as const satisfies TemperSkillLine
