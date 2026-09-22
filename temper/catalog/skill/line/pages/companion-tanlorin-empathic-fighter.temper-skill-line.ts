import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionTanlorinEmpathicFighter = {
  id: "019e61dc-f219-78df-be84-5865e16b40f6",
  type: "page-type/temper-skill-line",
  slug: "companion-tanlorin-empathic-fighter",
  title: "Empathic Fighter",
  key: "companion-tanlorin-empathic-fighter",
  displayOrder: 101,
  esoSkillLineId: 266,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
