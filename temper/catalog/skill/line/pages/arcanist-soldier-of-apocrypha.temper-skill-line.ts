import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const arcanistSoldierOfApocrypha = {
  id: "019e61dc-f1be-724b-9001-20f67c9409d2",
  type: "page-type/temper-skill-line",
  slug: "arcanist-soldier-of-apocrypha",
  title: "Soldier of Apocrypha",
  key: "arcanist-soldier-of-apocrypha",
  displayOrder: 20,
  esoSkillLineId: 219,
  maxRank: 50,
  category: "temper-skill-line-category/character-class",
  class: "temper-class/arcanist",
} as const satisfies TemperSkillLine
