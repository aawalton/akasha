import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const bastion = {
  id: "01a0e13c-0019-7900-a0aa-e57939e27e08",
  type: "page-type/temper-champion-star",
  slug: "bastion",
  title: "Bastion",
  description:
    "Increases the effectiveness of your damage shields and damage against shielded enemies by 15%",
  esoChampionSkillId: 46,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 50,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.921Z",
  updatedAt: "2026-10-19T22:56:24.198Z",
} as const satisfies TemperChampionStar
