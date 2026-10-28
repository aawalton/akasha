import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const pathsSheetCheckWorldCellar = {
  id: "01a182db-5bf2-7b47-9e0b-ad864d7fd3c8",
  type: "page-type/place",
  slug: "paths-sheet-check-world-cellar",
  title: "Test Cellar",
  world: "world/paths-sheet-check-world",
  depth: -1,
  exits: [
    {
      to: "place/paths-sheet-check-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/paths-sheet-check-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/paths-sheet-check-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/paths-sheet-check-player"],
    },
  ],
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies Place
