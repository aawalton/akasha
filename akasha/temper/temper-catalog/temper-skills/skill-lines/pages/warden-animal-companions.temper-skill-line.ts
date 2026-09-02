import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const wardenAnimalCompanions = {
  id: "01a05fce-2988-7318-819e-524658330099",
  pageTypeSlug: "temper-skill-line",
  slug: "warden-animal-companions",
  title: "Animal Companions",
  key: "warden-animal-companions",
  displayOrder: 1,
  esoSkillLineId: 127,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "warden",
} as const satisfies TemperSkillLine
