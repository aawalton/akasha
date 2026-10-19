import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const tirelessDiscipline = {
  id: "01a0e13c-001c-7d0f-ad7e-b9f6f5923131",
  type: "page-type/temper-champion-star",
  slug: "tireless-discipline",
  title: "Tireless Discipline",
  description: "Grants 520 Max Stamina (max 20 points)",
  esoChampionSkillId: 6,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 520 }],
  hashPlace: 79,
  jumpPoints: [0, 10, 20],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:51.996Z",
} as const satisfies TemperChampionStar
