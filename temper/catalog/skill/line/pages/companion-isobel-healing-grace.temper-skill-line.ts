import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionIsobelHealingGrace = {
  id: "019e61dc-f209-7ef4-b710-f0b8b61c224a",
  type: "page-type/temper-skill-line",
  slug: "companion-isobel-healing-grace",
  title: "Healing Grace",
  key: "companion-isobel-healing-grace",
  displayOrder: 89,
  esoSkillLineId: 202,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
