import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const sorcererStormCalling = {
  id: "01a05fce-297f-7802-9864-d1d48d5f0cef",
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
