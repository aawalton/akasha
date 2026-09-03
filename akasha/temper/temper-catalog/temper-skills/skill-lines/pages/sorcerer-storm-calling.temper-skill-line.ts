import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const sorcererStormCalling = {
  id: "019e61dc-f1ad-7d43-90cb-a41ab53ca380",
  pageTypeSlug: "temper-skill-line",
  slug: "sorcerer-storm-calling",
  title: "Storm Calling",
  key: "sorcerer-storm-calling",
  displayOrder: 15,
  esoSkillLineId: 43,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "sorcerer",
} as const satisfies TemperSkillLine
