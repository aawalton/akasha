import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const vengeanceAllianceWarSupport = {
  id: "019e6f53-86c8-73a8-b7df-a6c40e9c78d8",
  type: "page-type/temper-skill-line",
  slug: "vengeance-alliance-war-support",
  title: "Vengeance Support",
  key: "vengeance-alliance-war-support",
  displayOrder: 135,
  esoSkillLineId: 326,
  maxRank: 0,
  category: "temper-skill-line-category/alliance-war",
} as const satisfies TemperSkillLine
