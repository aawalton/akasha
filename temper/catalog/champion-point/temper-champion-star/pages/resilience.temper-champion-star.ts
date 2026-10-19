import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const resilience = {
  id: "01a0e13c-001b-7564-8e7a-a5ff33503dee",
  type: "page-type/temper-champion-star",
  slug: "resilience",
  title: "Resilience",
  description: "Grants 660 Critical Resistance",
  esoChampionSkillId: 13,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [{ metric: "temper-metric/resistance-critical", effectType: "integer", value: 660 }],
  hashPlace: 111,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:13.847Z",
} as const satisfies TemperChampionStar
