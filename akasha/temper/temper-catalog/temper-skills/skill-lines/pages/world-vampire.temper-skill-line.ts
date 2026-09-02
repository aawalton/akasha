import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const worldVampire = {
  id: "01a05fce-298c-78b9-80b9-9dd37346500e",
  pageTypeSlug: "temper-skill-line",
  slug: "world-vampire",
  title: "Vampire",
  key: "world-vampire",
  displayOrder: 35,
  esoSkillLineId: 51,
  maxRank: 10,
  subcategoryId: "world",
} as const satisfies TemperSkillLine
