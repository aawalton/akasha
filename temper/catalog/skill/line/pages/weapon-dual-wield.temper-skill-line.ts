import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const weaponDualWield = {
  id: "019e61dc-f1c1-7452-bad3-e06e6d846c8b",
  type: "page-type/temper-skill-line",
  slug: "weapon-dual-wield",
  title: "Dual Wield",
  key: "weapon-dual-wield",
  displayOrder: 24,
  esoSkillLineId: 31,
  maxRank: 50,
  category: "temper-skill-line-category/weapon",
} as const satisfies TemperSkillLine
