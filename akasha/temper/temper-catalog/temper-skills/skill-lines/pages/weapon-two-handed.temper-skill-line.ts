import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const weaponTwoHanded = {
  id: "01a05fce-298a-75ed-b841-9eacf137ed54",
  pageTypeSlug: "temper-skill-line",
  slug: "weapon-two-handed",
  title: "Two Handed",
  key: "weapon-two-handed",
  displayOrder: 22,
  esoSkillLineId: 30,
  maxRank: 50,
  subcategoryId: "weapon",
} as const satisfies TemperSkillLine
