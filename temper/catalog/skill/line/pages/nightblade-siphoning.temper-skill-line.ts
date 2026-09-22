import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const nightbladeSiphoning = {
  id: "019e61dc-f1b1-7661-bca6-7f22791364a9",
  type: "page-type/temper-skill-line",
  slug: "nightblade-siphoning",
  title: "Siphoning",
  key: "nightblade-siphoning",
  displayOrder: 12,
  esoSkillLineId: 40,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "temper-class/nightblade",
} as const satisfies TemperSkillLine
