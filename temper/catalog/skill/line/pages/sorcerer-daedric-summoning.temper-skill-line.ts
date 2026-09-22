import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const sorcererDaedricSummoning = {
  id: "019e61dc-f1aa-72a2-942d-67f0e47f3e8c",
  type: "page-type/temper-skill-line",
  slug: "sorcerer-daedric-summoning",
  title: "Daedric Summoning",
  key: "sorcerer-daedric-summoning",
  displayOrder: 14,
  esoSkillLineId: 42,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "temper-class/sorcerer",
} as const satisfies TemperSkillLine
