import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedLightArmor = {
  id: "019e61dc-f1f0-7ca9-9715-c0d06607c681",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-light-armor",
  title: "Light Armor",
  key: "companion-shared-light-armor",
  displayOrder: 69,
  esoSkillLineId: 186,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
