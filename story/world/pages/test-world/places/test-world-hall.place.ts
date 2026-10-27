import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const testWorldHall = {
  id: "01a17ec5-127c-7c95-8abc-8383ca570a2c",
  type: "page-type/place",
  slug: "test-world-hall",
  title: "Test Hall",
  world: "world/test-world",
  depth: 0,
  exits: [
    { to: "place/test-world-square", way: "Down the steps to the square.", direction: "south" },
  ],
  facts: [
    {
      fact: "The hall is one long room with a stone floor, a hearth and a notice board.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T19:10:06.969Z",
} as const satisfies Place
