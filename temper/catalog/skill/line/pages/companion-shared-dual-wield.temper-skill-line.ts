import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedDualWield = {
  id: "019e61dc-f1eb-7d6c-a9c0-a2d6e3ddf0bb",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-dual-wield",
  title: "Dual Wield",
  key: "companion-shared-dual-wield",
  displayOrder: 65,
  esoSkillLineId: 182,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
