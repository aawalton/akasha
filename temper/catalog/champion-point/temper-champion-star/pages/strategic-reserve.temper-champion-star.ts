import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const strategicReserve = {
  id: "01a0e13c-001b-7b23-b0cb-f78e70e48106",
  type: "page-type/temper-champion-star",
  slug: "strategic-reserve",
  title: "Strategic Reserve",
  description: "Gain 30 Health Recovery for every 10 Ultimate you have",
  esoChampionSkillId: 49,
  championConstellation: "fitness",
  isSlottable: true,
  effects: [
    {
      metric: "temper-metric/health-recovery",
      effectType: "integer-per-ten-ultimate",
      value: 30,
    },
  ],
  hashPlace: 55,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-20T16:45:54.904Z",
} as const satisfies TemperChampionStar
