import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const templarAedricSpear = {
  id: "019e61dc-f1b2-7a64-8b8f-0831d59e794a",
  pageTypeSlug: "temper-skill-line",
  slug: "templar-aedric-spear",
  title: "Aedric Spear",
  key: "templar-aedric-spear",
  displayOrder: 4,
  esoSkillLineId: 22,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "templar",
} as const satisfies TemperSkillLine
