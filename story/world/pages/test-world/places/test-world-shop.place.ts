import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const testWorldShop = {
  id: "01a17ec5-127c-728d-b964-e90af5658595",
  type: "page-type/place",
  slug: "test-world-shop",
  title: "Test Shop",
  world: "world/test-world",
  depth: 0,
  exits: [
    { to: "place/test-world-square", way: "Out through the green door.", direction: "west" },
    {
      to: "place/test-world-cellar",
      way: "Through the back door behind the counter and down the wooden steps.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "The shop sells blades, coats, lamps, ore and draughts from shelves behind one counter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lantern from the shop costs 8 copper and comes filled with oil.",
      knowers: ["lore-disclosure/game-master", "character-player/test-story-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/test-story-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/test-story-player"],
    },
    {
      fact: "The shop's green door stands unlatched from dawn to dusk, and a small bell hangs inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-28T00:38:23.418Z",
} as const satisfies Place
