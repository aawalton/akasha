import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedUndaunted = {
  id: "019e61dc-f1f7-7110-9f6c-e813bea57d2b",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-undaunted",
  title: "Undaunted",
  key: "companion-shared-undaunted",
  displayOrder: 74,
  esoSkillLineId: 191,
  maxRank: 10,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
