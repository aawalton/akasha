import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const tumbling = {
  id: "01a0e13c-001c-7d23-8244-010956130869",
  type: "page-type/temper-champion-star",
  slug: "tumbling",
  title: "Tumbling",
  description: "Reduces the cost of Roll Dodge by 240 Stamina",
  esoChampionSkillId: 37,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/stamina-dodge-cost", effectType: "integer", value: -240 }],
  hashPlace: 41,
  jumpPoints: [0, 15, 30],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:52.915Z",
} as const satisfies TemperChampionStar
