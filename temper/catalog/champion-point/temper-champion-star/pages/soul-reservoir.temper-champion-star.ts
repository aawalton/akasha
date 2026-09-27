import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const soulReservoir = {
  id: "01a0e13c-001b-7927-b3b9-0fb47e97fb1a",
  type: "page-type/temper-champion-star",
  slug: "soul-reservoir",
  title: "Soul Reservoir",
  description:
    "When you resurrect yourself or another player you have a 33% chance to not consume a Soul Gem",
  esoChampionSkillId: 87,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 17,
} as const satisfies TemperChampionStar
