import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const necromancerLivingDeath = {
  id: "019e61dc-f1ba-7e48-84e1-800197d72a33",
  type: "page-type/temper-skill-line",
  slug: "necromancer-living-death",
  title: "Living Death",
  key: "necromancer-living-death",
  displayOrder: 18,
  esoSkillLineId: 133,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "temper-class/necromancer",
} as const satisfies TemperSkillLine
