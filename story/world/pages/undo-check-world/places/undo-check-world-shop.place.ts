import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const undoCheckWorldShop = {
  id: "01a18309-e114-7a95-9bb9-aab2825ce588",
  type: "page-type/place",
  slug: "undo-check-world-shop",
  title: "Test Shop",
  world: "world/undo-check-world",
  depth: 0,
  exits: [
    { to: "place/undo-check-world-square", way: "Out through the green door.", direction: "west" },
    {
      to: "place/undo-check-world-cellar",
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
      knowers: ["lore-disclosure/game-master", "character-player/undo-check-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/undo-check-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/undo-check-player"],
    },
    {
      fact: "The shop's green door stands unlatched from dawn to dusk, and a small bell hangs inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies Place
