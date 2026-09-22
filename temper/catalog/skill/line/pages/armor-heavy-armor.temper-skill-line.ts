import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const armorHeavyArmor = {
  id: "019e61dc-f1c5-7102-8a97-3f4741348e52",
  type: "page-type/temper-skill-line",
  slug: "armor-heavy-armor",
  title: "Heavy Armor",
  key: "armor-heavy-armor",
  displayOrder: 30,
  esoSkillLineId: 26,
  maxRank: 50,
  category: "temper-skill-line-category/armor",
} as const satisfies TemperSkillLine
