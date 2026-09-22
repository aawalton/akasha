import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const vengeanceArmor = {
  id: "019e6f53-86cb-7401-bc4a-6012fcfa2708",
  type: "page-type/temper-skill-line",
  slug: "vengeance-armor",
  title: "Vengeance Armor",
  key: "vengeance-armor",
  displayOrder: 138,
  esoSkillLineId: 332,
  maxRank: 0,
  category: "temper-skill-line-category/alliance-war",
} as const satisfies TemperSkillLine
