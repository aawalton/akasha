import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const necromancerGraveLord = {
  id: "01a05fce-297a-7247-a565-9bc2d9326820",
  pageTypeSlug: "temper-skill-line",
  slug: "necromancer-grave-lord",
  title: "Grave Lord",
  key: "necromancer-grave-lord",
  displayOrder: 16,
  esoSkillLineId: 131,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "necromancer",
} as const satisfies TemperSkillLine
