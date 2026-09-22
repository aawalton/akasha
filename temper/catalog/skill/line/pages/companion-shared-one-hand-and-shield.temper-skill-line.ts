import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedOneHandAndShield = {
  id: "019e61dc-f1ea-79e7-84b8-b4156668687d",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-one-hand-and-shield",
  title: "One Hand and Shield",
  key: "companion-shared-one-hand-and-shield",
  displayOrder: 64,
  esoSkillLineId: 181,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
