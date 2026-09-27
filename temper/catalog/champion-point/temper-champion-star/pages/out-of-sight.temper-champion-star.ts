import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const outOfSight = {
  id: "01a0e13c-001b-7332-9a83-771bc13c5fe9",
  type: "page-type/temper-champion-star",
  slug: "out-of-sight",
  title: "Out of Sight",
  description: "Reduces the radius you can be detected while Sneaking by 3 meters",
  esoChampionSkillId: 68,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 1,
} as const satisfies TemperChampionStar
