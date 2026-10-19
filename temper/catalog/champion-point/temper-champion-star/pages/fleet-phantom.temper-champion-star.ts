import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const fleetPhantom = {
  id: "01a0e13c-001a-7fef-99f2-430a27e9cf4b",
  type: "page-type/temper-champion-star",
  slug: "fleet-phantom",
  title: "Fleet Phantom",
  description: "Reduces the Movement Speed penalty of Sneak by 25%",
  esoChampionSkillId: 67,
  championConstellation: "craft",
  isSlottable: false,
  effects: [
    {
      metric: "temper-metric/movement-sneak-penalty",
      effectType: "fractional-change",
      value: -0.25,
    },
  ],
  hashPlace: 14,
  jumpPoints: [0, 8, 16, 24, 32, 40],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:57:00.681Z",
} as const satisfies TemperChampionStar
