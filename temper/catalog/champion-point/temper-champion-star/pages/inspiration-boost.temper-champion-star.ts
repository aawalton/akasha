import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const inspirationBoost = {
  id: "01a0e13c-001b-7d2f-beeb-c0868fd7d2db",
  type: "page-type/temper-champion-star",
  slug: "inspiration-boost",
  title: "Inspiration Boost",
  description: "Increases your crafting inspiration gained by 30%",
  esoChampionSkillId: 72,
  championConstellation: "craft",
  isSlottable: false,
  effects: [
    { metric: "temper-metric/inspiration-gain", effectType: "fractional-change", value: 0.3 },
  ],
  hashPlace: 11,
  jumpPoints: [0, 15, 30, 45],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:32.882Z",
} as const satisfies TemperChampionStar
