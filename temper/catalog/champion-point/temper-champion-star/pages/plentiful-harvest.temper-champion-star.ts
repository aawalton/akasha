import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const plentifulHarvest = {
  id: "01a0e13c-001b-7f96-90d0-08b07895a5fa",
  type: "page-type/temper-champion-star",
  slug: "plentiful-harvest",
  title: "Plentiful Harvest",
  description: "You have a 50% chance to gain double the yield from normal resource nodes",
  esoChampionSkillId: 81,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 9,
} as const satisfies TemperChampionStar
