import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const anglersInstincts = {
  id: "01a0e13c-0018-7a8b-ade1-7562346c97cd",
  type: "page-type/temper-champion-star",
  slug: "anglers-instincts",
  title: "Angler's Instincts",
  description:
    "Increases your chance of catching higher quality fish, akin to fishing with another player. This effect can stack with other similar bonuses",
  esoChampionSkillId: 89,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 25,
  jumpPoints: [0, 25],
  createdAt: "2026-09-27T05:00:00.920Z",
  updatedAt: "2026-10-19T22:56:20.717Z",
} as const satisfies TemperChampionStar
