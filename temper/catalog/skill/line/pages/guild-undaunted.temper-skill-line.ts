import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const guildUndaunted = {
  id: "019e61dc-f1ca-772f-a621-ae41dd793b57",
  type: "page-type/temper-skill-line",
  slug: "guild-undaunted",
  title: "Undaunted",
  key: "guild-undaunted",
  displayOrder: 42,
  esoSkillLineId: 55,
  maxRank: 10,
  category: "temper-skill-line-category/guild",
} as const satisfies TemperSkillLine
