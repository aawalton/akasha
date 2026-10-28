import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const undoCheckWorldCellar = {
  id: "01a18309-e114-7c5f-a1f6-90d1964b11e6",
  type: "page-type/place",
  slug: "undo-check-world-cellar",
  title: "Test Cellar",
  world: "world/undo-check-world",
  depth: -1,
  exits: [
    {
      to: "place/undo-check-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/undo-check-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/undo-check-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/undo-check-player"],
    },
  ],
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies Place
