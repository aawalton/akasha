import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const pathsProbeWorldShop = {
  id: "01a18008-7533-7baf-873e-8d39cca7062e",
  type: "page-type/place",
  slug: "paths-probe-world-shop",
  title: "Test Shop",
  world: "world/paths-probe-world",
  depth: 0,
  exits: [
    { to: "place/paths-probe-world-square", way: "Out through the green door.", direction: "west" },
    {
      to: "place/paths-probe-world-cellar",
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
      knowers: ["lore-disclosure/game-master", "character-player/paths-probe-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/paths-probe-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/paths-probe-player"],
    },
    {
      fact: "The shop's green door stands unlatched from dawn to dusk, and a small bell hangs inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies Place
