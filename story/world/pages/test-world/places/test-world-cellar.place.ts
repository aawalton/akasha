import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const testWorldCellar = {
  id: "01a17ec5-127b-7fa9-be67-1de8f228ceee",
  type: "page-type/place",
  slug: "test-world-cellar",
  title: "Test Cellar",
  world: "world/test-world",
  depth: -1,
  exits: [
    { to: "place/test-world-square", way: "Up the stone stair to the well.", direction: "up" },
    {
      to: "place/test-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/test-story-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/test-story-player"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T20:57:12.634Z",
} as const satisfies Place
