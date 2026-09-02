import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const weaponBow = {
  id: "01a05fce-2989-7f15-9dfa-1ca94fde10f9",
  pageTypeSlug: "temper-skill-line",
  slug: "weapon-bow",
  title: "Bow",
  key: "weapon-bow",
  displayOrder: 25,
  esoSkillLineId: 32,
  maxRank: 50,
  subcategoryId: "weapon",
} as const satisfies TemperSkillLine
