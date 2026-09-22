import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const templarRestoringLight = {
  id: "019e61dc-f1b4-7ec5-9a16-e7243d81e922",
  type: "page-type/temper-skill-line",
  slug: "templar-restoring-light",
  title: "Restoring Light",
  key: "templar-restoring-light",
  displayOrder: 6,
  esoSkillLineId: 28,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "temper-class/templar",
} as const satisfies TemperSkillLine
