import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const testWorldShop = {
  id: "01a17ec5-127c-728d-b964-e90af5658595",
  type: "page-type/place",
  slug: "test-world-shop",
  title: "Test Shop",
  world: "world/test-world",
  depth: 0,
  exits: [{ to: "place/test-world-square", way: "Out through the green door.", direction: "west" }],
  facts: [
    {
      fact: "The shop sells blades, coats, lamps, ore and draughts from shelves behind one counter.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T19:10:06.969Z",
} as const satisfies Place
