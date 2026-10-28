import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const pendingRollTrialWorldShop = {
  id: "01a183cf-b828-7fe6-a03a-9f59722ef61e",
  type: "page-type/place",
  slug: "pending-roll-trial-world-shop",
  title: "Test Shop",
  world: "world/pending-roll-trial-world",
  depth: 0,
  exits: [
    {
      to: "place/pending-roll-trial-world-square",
      way: "Out through the green door.",
      direction: "west",
    },
    {
      to: "place/pending-roll-trial-world-cellar",
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
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
    {
      fact: "The shop's green door stands unlatched from dawn to dusk, and a small bell hangs inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies Place
