import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const racialRedguardSkills = {
  id: "019e61dc-f1df-7431-b87c-898846fa6d78",
  type: "page-type/temper-skill-line",
  slug: "racial-redguard-skills",
  title: "Redguard Skills",
  key: "racial-redguard-skills",
  displayOrder: 52,
  esoSkillLineId: 62,
  maxRank: 50,
  category: "temper-skill-line-category/racial",
} as const satisfies TemperSkillLine
