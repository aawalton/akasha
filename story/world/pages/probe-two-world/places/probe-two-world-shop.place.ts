import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const probeTwoWorldShop = {
  id: "01a17fbf-aff5-736f-b6e8-b7d2fda9c5e5",
  type: "page-type/place",
  slug: "probe-two-world-shop",
  title: "Test Shop",
  world: "world/probe-two-world",
  depth: 0,
  exits: [
    { to: "place/probe-two-world-square", way: "Out through the green door.", direction: "west" },
    {
      to: "place/probe-two-world-cellar",
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
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
  ],
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies Place
