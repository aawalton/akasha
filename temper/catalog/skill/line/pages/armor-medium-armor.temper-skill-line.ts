import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const armorMediumArmor = {
  id: "019e61dc-f1c5-7f97-a2d1-5355e8b72c72",
  type: "page-type/temper-skill-line",
  slug: "armor-medium-armor",
  title: "Medium Armor",
  key: "armor-medium-armor",
  displayOrder: 29,
  esoSkillLineId: 25,
  maxRank: 50,
  category: "temper-skill-line-category/armor",
} as const satisfies TemperSkillLine
