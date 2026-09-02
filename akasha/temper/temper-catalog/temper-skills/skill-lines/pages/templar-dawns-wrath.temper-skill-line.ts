import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const templarDawnsWrath = {
  id: "01a05fce-2980-7f96-9500-da7f5ab008ad",
  pageTypeSlug: "temper-skill-line",
  slug: "templar-dawns-wrath",
  title: "Dawn's Wrath",
  key: "templar-dawns-wrath",
  displayOrder: 5,
  esoSkillLineId: 27,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "templar",
} as const satisfies TemperSkillLine
