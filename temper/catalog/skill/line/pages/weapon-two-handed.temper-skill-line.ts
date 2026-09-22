import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const weaponTwoHanded = {
  id: "019e61dc-f1bf-7342-8837-568a7e844e15",
  type: "page-type/temper-skill-line",
  slug: "weapon-two-handed",
  title: "Two Handed",
  key: "weapon-two-handed",
  displayOrder: 22,
  esoSkillLineId: 30,
  maxRank: 50,
  category: "temper-skill-line-category/weapon",
} as const satisfies TemperSkillLine
