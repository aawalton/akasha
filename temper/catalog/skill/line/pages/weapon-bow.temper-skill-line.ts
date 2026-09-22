import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const weaponBow = {
  id: "019e61dc-f1c2-7360-819f-d247e548dfb9",
  type: "page-type/temper-skill-line",
  slug: "weapon-bow",
  title: "Bow",
  key: "weapon-bow",
  displayOrder: 25,
  esoSkillLineId: 32,
  maxRank: 50,
  category: "temper-skill-line-category/weapon",
} as const satisfies TemperSkillLine
