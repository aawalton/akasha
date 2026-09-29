import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const otherwhereXRare = {
  id: "01a0ea7e-e4c6-7e08-a719-5fc9f255dbeb",
  type: "page-type/world-rank",
  slug: "otherwhere-x-rare",
  title: "Rare",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "The third rarity a skill can hold, above uncommon.",
  place: 3,
} as const satisfies WorldRank
