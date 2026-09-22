import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const wardenAnimalCompanions = {
  id: "019e61dc-f1b5-7fde-a419-a90f82294c4c",
  type: "page-type/temper-skill-line",
  slug: "warden-animal-companions",
  title: "Animal Companions",
  key: "warden-animal-companions",
  displayOrder: 1,
  esoSkillLineId: 127,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "temper-class/warden",
} as const satisfies TemperSkillLine
