import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const templarAedricSpear = {
  id: "01a05fce-297f-782b-a9aa-53f8f809a18b",
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
