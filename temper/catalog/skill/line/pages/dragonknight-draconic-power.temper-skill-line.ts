import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const dragonknightDraconicPower = {
  id: "019e61dc-f1a5-7b3b-846d-fbacc1f092a7",
  type: "page-type/temper-skill-line",
  slug: "dragonknight-draconic-power",
  title: "Draconic Power",
  key: "dragonknight-draconic-power",
  displayOrder: 8,
  esoSkillLineId: 36,
  maxRank: 50,
  category: "temper-skill-line-category/character-class",
  class: "temper-class/dragonknight",
} as const satisfies TemperSkillLine
