import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const racialArgonianSkills = {
  id: "019e61dc-f1d7-78ff-ad35-c4e5f5426091",
  type: "page-type/temper-skill-line",
  slug: "racial-argonian-skills",
  title: "Argonian Skills",
  key: "racial-argonian-skills",
  displayOrder: 53,
  esoSkillLineId: 63,
  maxRank: 50,
  category: "temper-skill-line-category/racial",
} as const satisfies TemperSkillLine
