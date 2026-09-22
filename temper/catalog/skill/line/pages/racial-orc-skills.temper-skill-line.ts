import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const racialOrcSkills = {
  id: "019e61dc-f1de-72b3-9c1f-07c244937a76",
  type: "page-type/temper-skill-line",
  slug: "racial-orc-skills",
  title: "Orc Skills",
  key: "racial-orc-skills",
  displayOrder: 47,
  esoSkillLineId: 52,
  maxRank: 50,
  category: "temper-skill-line-category/racial",
} as const satisfies TemperSkillLine
