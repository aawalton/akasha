import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const pathsSheetCheckWorldSquare = {
  id: "01a182db-5bf2-7a1d-bed6-9ef1af7299f2",
  type: "page-type/place",
  slug: "paths-sheet-check-world-square",
  title: "Test Square",
  world: "world/paths-sheet-check-world",
  depth: 0,
  exits: [
    {
      to: "place/paths-sheet-check-world-hall",
      way: "Up the steps on the square's north side.",
      direction: "north",
    },
    {
      to: "place/paths-sheet-check-world-shop",
      way: "Through the green door on the east side.",
      direction: "east",
    },
    {
      to: "place/paths-sheet-check-world-cellar",
      way: "Down the stone stair by the well.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "The square is cobbled, with a well at its middle and a bench beside the well.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The well is a round stone shaft with still, clear water far below and a bucket on a rope.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The square's well is a round shaft of fitted stone, its rim waist-high.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The square's well drops a long way, its stone walls darkening further down.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The square's well holds clear water far below its rim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wooden bucket sits on the rim of the square's well, its rope coiled beside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies Place
