import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedMediumArmor = {
  id: "019e61dc-f1f2-7041-aee1-03f11ed86d9a",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-medium-armor",
  title: "Medium Armor",
  key: "companion-shared-medium-armor",
  displayOrder: 70,
  esoSkillLineId: 187,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
