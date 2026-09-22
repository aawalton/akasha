import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const nightbladeShadow = {
  id: "019e61dc-f1b0-755b-90b5-336927c6210d",
  type: "page-type/temper-skill-line",
  slug: "nightblade-shadow",
  title: "Shadow",
  key: "nightblade-shadow",
  displayOrder: 11,
  esoSkillLineId: 39,
  maxRank: 50,
  category: "temper-skill-line-category/character-class",
  class: "temper-class/nightblade",
} as const satisfies TemperSkillLine
