import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedHeavyArmor = {
  id: "019e61dc-f1f3-7532-99a9-fec16ebf7c1c",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-heavy-armor",
  title: "Heavy Armor",
  key: "companion-shared-heavy-armor",
  displayOrder: 71,
  esoSkillLineId: 188,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
