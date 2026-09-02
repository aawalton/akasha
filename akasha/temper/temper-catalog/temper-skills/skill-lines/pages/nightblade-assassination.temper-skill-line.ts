import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const nightbladeAssassination = {
  id: "01a05fce-297b-7c8d-9468-f91bf4ae25ff",
  pageTypeSlug: "temper-skill-line",
  slug: "nightblade-assassination",
  title: "Assassination",
  key: "nightblade-assassination",
  displayOrder: 10,
  esoSkillLineId: 38,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "nightblade",
} as const satisfies TemperSkillLine
