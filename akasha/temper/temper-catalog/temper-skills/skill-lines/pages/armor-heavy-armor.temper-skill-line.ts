import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const armorHeavyArmor = {
  id: "01a05fce-2967-7c11-8476-10a576db95f7",
  pageTypeSlug: "temper-skill-line",
  slug: "armor-heavy-armor",
  title: "Heavy Armor",
  key: "armor-heavy-armor",
  displayOrder: 30,
  esoSkillLineId: 26,
  maxRank: 50,
  subcategoryId: "armor",
} as const satisfies TemperSkillLine
