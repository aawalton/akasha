import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const nightbladeSiphoning = {
  id: "01a05fce-297b-7314-8a0c-77f8169610a4",
  pageTypeSlug: "temper-skill-line",
  slug: "nightblade-siphoning",
  title: "Siphoning",
  key: "nightblade-siphoning",
  displayOrder: 12,
  esoSkillLineId: 40,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "nightblade",
} as const satisfies TemperSkillLine
