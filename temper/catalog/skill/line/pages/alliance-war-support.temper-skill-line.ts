import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const allianceWarSupport = {
  id: "019e61dc-f1cf-7867-8757-c7e17b7f5171",
  type: "page-type/temper-skill-line",
  slug: "alliance-war-support",
  title: "Support",
  key: "alliance-war-support",
  displayOrder: 45,
  esoSkillLineId: 67,
  maxRank: 10,
  category: "temper-skill-line-category/alliance-war",
} as const satisfies TemperSkillLine
