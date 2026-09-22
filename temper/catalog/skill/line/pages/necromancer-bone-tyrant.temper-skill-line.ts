import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const necromancerBoneTyrant = {
  id: "019e61dc-f1b9-70b4-8838-6165bc4a1110",
  type: "page-type/temper-skill-line",
  slug: "necromancer-bone-tyrant",
  title: "Bone Tyrant",
  key: "necromancer-bone-tyrant",
  displayOrder: 17,
  esoSkillLineId: 132,
  maxRank: 50,
  category: "temper-skill-line-category/character-class",
  class: "temper-class/necromancer",
} as const satisfies TemperSkillLine
