import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const timeProbeWorldShop = {
  id: "01a1802d-b13e-764b-9f3b-71b5c2ab3e71",
  type: "page-type/place",
  slug: "time-probe-world-shop",
  title: "Test Shop",
  world: "world/time-probe-world",
  depth: 0,
  exits: [
    { to: "place/time-probe-world-square", way: "Out through the green door.", direction: "west" },
    {
      to: "place/time-probe-world-cellar",
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
      knowers: ["lore-disclosure/game-master", "character-player/time-probe-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/time-probe-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/time-probe-player"],
    },
    {
      fact: "The shop's green door stands unlatched from dawn to dusk, and a small bell hangs inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies Place
