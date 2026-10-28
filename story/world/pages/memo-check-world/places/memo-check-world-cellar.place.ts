import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const memoCheckWorldCellar = {
  id: "01a1832d-38c0-7280-9840-c2f9867a6770",
  type: "page-type/place",
  slug: "memo-check-world-cellar",
  title: "Test Cellar",
  world: "world/memo-check-world",
  depth: -1,
  exits: [
    {
      to: "place/memo-check-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/memo-check-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/memo-check-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/memo-check-player"],
    },
  ],
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies Place
