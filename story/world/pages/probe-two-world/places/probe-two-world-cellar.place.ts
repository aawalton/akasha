import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const probeTwoWorldCellar = {
  id: "01a17fbf-aff5-7272-88ab-5a39aed04234",
  type: "page-type/place",
  slug: "probe-two-world-cellar",
  title: "Test Cellar",
  world: "world/probe-two-world",
  depth: -1,
  exits: [
    { to: "place/probe-two-world-square", way: "Up the stone stair to the well.", direction: "up" },
    {
      to: "place/probe-two-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
  ],
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies Place
