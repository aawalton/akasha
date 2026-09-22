import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const allianceWarEmperor = {
  id: "019e61dc-f1d0-77b6-b555-1d34565fdaa2",
  type: "page-type/temper-skill-line",
  slug: "alliance-war-emperor",
  title: "Emperor",
  key: "alliance-war-emperor",
  displayOrder: 44,
  esoSkillLineId: 71,
  maxRank: 9,
  category: "temper-skill-line-category/alliance-war",
} as const satisfies TemperSkillLine
