import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const temperedSoul = {
  id: "01a0e13c-001c-7d07-8bcb-a1e6eb540c84",
  type: "page-type/temper-champion-star",
  slug: "tempered-soul",
  title: "Tempered Soul",
  description: "Return to life after resurrection with 10% more resources",
  esoChampionSkillId: 58,
  championConstellation: "fitness",
  isSlottable: false,
  hashPlace: 33,
  jumpPoints: [0, 25, 50],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:51.110Z",
} as const satisfies TemperChampionStar
