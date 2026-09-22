import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const racialImperialSkills = {
  id: "019e61dc-f1db-75e3-896b-80861628ae9c",
  type: "page-type/temper-skill-line",
  slug: "racial-imperial-skills",
  title: "Imperial Skills",
  key: "racial-imperial-skills",
  displayOrder: 50,
  esoSkillLineId: 59,
  maxRank: 50,
  category: "temper-skill-line-category/racial",
} as const satisfies TemperSkillLine
