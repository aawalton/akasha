import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const racialNordSkills = {
  id: "01a05fce-297d-7435-a966-322484ae3c2c",
  pageTypeSlug: "temper-skill-line",
  slug: "racial-nord-skills",
  title: "Nord Skills",
  key: "racial-nord-skills",
  displayOrder: 55,
  esoSkillLineId: 65,
  maxRank: 50,
  subcategoryId: "racial",
} as const satisfies TemperSkillLine
