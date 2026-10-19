import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const giftedRider = {
  id: "01a0e13c-001a-7dc0-883f-f56a263b93e3",
  type: "page-type/temper-champion-star",
  slug: "gifted-rider",
  title: "Gifted Rider",
  description: "Increases your Mount Speed by 10%",
  esoChampionSkillId: 92,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 28,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:57.374Z",
} as const satisfies TemperChampionStar
