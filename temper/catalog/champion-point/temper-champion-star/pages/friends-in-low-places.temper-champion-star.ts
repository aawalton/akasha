import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const friendsInLowPlaces = {
  id: "01a0e13c-001a-7f71-b072-aa812aff921b",
  type: "page-type/temper-champion-star",
  slug: "friends-in-low-places",
  title: "Friends in Low Places",
  description:
    "Removes 1000 gold from your bounty once per day when committing a crime where bounty is added. You must be level 50 for this passive to activate, and your current bounty must be at or greater than 1000 gold",
  esoChampionSkillId: 76,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 21,
} as const satisfies TemperChampionStar
