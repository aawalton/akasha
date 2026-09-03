import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const armorHeavyArmor = {
  id: "019e61dc-f1c5-7102-8a97-3f4741348e52",
  pageTypeSlug: "temper-skill-line",
  slug: "armor-heavy-armor",
  title: "Heavy Armor",
  key: "armor-heavy-armor",
  displayOrder: 30,
  esoSkillLineId: 26,
  maxRank: 50,
  subcategoryId: "armor",
} as const satisfies TemperSkillLine
