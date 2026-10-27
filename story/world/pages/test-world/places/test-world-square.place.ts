import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const testWorldSquare = {
  id: "01a17ec5-127c-7e15-9e56-26cc379d4bb3",
  type: "page-type/place",
  slug: "test-world-square",
  title: "Test Square",
  world: "world/test-world",
  depth: 0,
  exits: [
    {
      to: "place/test-world-hall",
      way: "Up the steps on the square's north side.",
      direction: "north",
    },
    {
      to: "place/test-world-shop",
      way: "Through the green door on the east side.",
      direction: "east",
    },
    { to: "place/test-world-cellar", way: "Down the stone stair by the well.", direction: "down" },
  ],
  facts: [
    {
      fact: "The square is cobbled, with a well at its middle and a bench beside the well.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T19:10:06.969Z",
} as const satisfies Place
