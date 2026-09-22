import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const templarAedricSpear = {
  id: "019e61dc-f1b2-7a64-8b8f-0831d59e794a",
  type: "page-type/temper-skill-line",
  slug: "templar-aedric-spear",
  title: "Aedric Spear",
  key: "templar-aedric-spear",
  displayOrder: 4,
  esoSkillLineId: 22,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "temper-class/templar",
} as const satisfies TemperSkillLine
