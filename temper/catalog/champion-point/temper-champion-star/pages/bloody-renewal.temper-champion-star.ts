import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const bloodyRenewal = {
  id: "01a0e13c-0019-7e36-ade9-7d4d6b399d2f",
  type: "page-type/temper-champion-star",
  slug: "bloody-renewal",
  title: "Bloody Renewal",
  description: "Restore 1500 Stamina whenever you kill an enemy",
  esoChampionSkillId: 48,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 54,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.921Z",
  updatedAt: "2026-10-19T22:56:27.711Z",
} as const satisfies TemperChampionStar
