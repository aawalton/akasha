import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereAuroraLake = {
  id: "01a0e9bd-41ef-7cc8-9977-4a4022cdc585",
  type: "page-type/place",
  slug: "otherwhere-aurora-lake",
  title: "Aurora's Lake and the Shrine of the Faceless Gods",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-aurora",
  facts: [
    {
      fact: "Aurora's lake is azure, at least five miles wide and thousands of feet deep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A tree-covered spire of stone rises from the middle as an island.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Shrine of the Faceless Gods is a white building by shallow pools and a pillar of flame.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Six marble statues in the shrine bear faces chipped away with crude tools.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A gigantic, shy creature with deep blue scales lives in the lake and harms no one.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
