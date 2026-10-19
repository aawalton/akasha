import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const tirelessGuardian = {
  id: "01a0e13c-001c-7559-85ce-b56cf9a232b2",
  type: "page-type/temper-champion-star",
  slug: "tireless-guardian",
  title: "Tireless Guardian",
  description: "Reduces the cost of Block by 40 Stamina",
  esoChampionSkillId: 39,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/stamina-block-cost", effectType: "integer", value: -40 }],
  hashPlace: 36,
  jumpPoints: [0, 10, 20],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:45.991Z",
} as const satisfies TemperChampionStar
