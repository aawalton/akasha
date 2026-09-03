import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const weaponBow = {
  id: "019e61dc-f1c2-7360-819f-d247e548dfb9",
  pageTypeSlug: "temper-skill-line",
  slug: "weapon-bow",
  title: "Bow",
  key: "weapon-bow",
  displayOrder: 25,
  esoSkillLineId: 32,
  maxRank: 50,
  subcategoryId: "weapon",
} as const satisfies TemperSkillLine
