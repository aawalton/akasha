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
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:40.189Z",
} as const satisfies TemperChampionStar
