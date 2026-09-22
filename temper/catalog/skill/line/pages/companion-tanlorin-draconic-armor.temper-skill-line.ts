import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionTanlorinDraconicArmor = {
  id: "019e61dc-f218-7490-b7d5-8fb0cf3d2fcc",
  type: "page-type/temper-skill-line",
  slug: "companion-tanlorin-draconic-armor",
  title: "Draconic Armor",
  key: "companion-tanlorin-draconic-armor",
  displayOrder: 100,
  esoSkillLineId: 265,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
