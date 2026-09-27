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
} as const satisfies TemperChampionStar
