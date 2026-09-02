import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const sorcererDaedricSummoning = {
  id: "01a05fce-297e-7cc3-bb97-993c45fc8208",
  pageTypeSlug: "temper-skill-line",
  slug: "sorcerer-daedric-summoning",
  title: "Daedric Summoning",
  key: "sorcerer-daedric-summoning",
  displayOrder: 14,
  esoSkillLineId: 42,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "sorcerer",
} as const satisfies TemperSkillLine
