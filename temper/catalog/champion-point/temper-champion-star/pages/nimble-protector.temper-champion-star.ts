import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const nimbleProtector = {
  id: "01a0e13c-001b-7e11-8042-1f05421d69af",
  type: "page-type/temper-champion-star",
  slug: "nimble-protector",
  title: "Nimble Protector",
  description: "Increases your Movement Speed while Bracing by 6%",
  esoChampionSkillId: 44,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/block-speed", effectType: "fractional-change", value: 0.06 }],
  hashPlace: 39,
  jumpPoints: [0, 3, 6],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:34.627Z",
} as const satisfies TemperChampionStar
