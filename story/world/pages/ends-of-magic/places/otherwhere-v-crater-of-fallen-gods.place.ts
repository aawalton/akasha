import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVCraterOfFallenGods = {
  id: "01a0e9f9-e637-71a1-acf6-4dbca74899aa",
  type: "page-type/place",
  slug: "otherwhere-v-crater-of-fallen-gods",
  title: "The Crater of Fallen Gods",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-ostren",
  facts: [
    {
      fact: "The Crater of Fallen Gods is nearly a dozen miles across, with a central peak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Divine remnants light the crater evenly, so nothing in it casts a shadow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The crater is a tourist spot; its cache was looted long ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The stone nub at the crater's center is worn smooth by sightseers' boots.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
