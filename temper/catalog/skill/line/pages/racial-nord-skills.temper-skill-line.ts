import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const racialNordSkills = {
  id: "019e61dc-f1dd-706a-af86-0bbf6344976f",
  type: "page-type/temper-skill-line",
  slug: "racial-nord-skills",
  title: "Nord Skills",
  key: "racial-nord-skills",
  displayOrder: 55,
  esoSkillLineId: 65,
  maxRank: 50,
  category: "temper-skill-line-category/racial",
} as const satisfies TemperSkillLine
