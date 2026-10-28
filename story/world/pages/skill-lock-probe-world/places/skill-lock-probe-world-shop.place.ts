import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const skillLockProbeWorldShop = {
  id: "01a17ff8-9a7f-704f-896e-868f2a7a0f62",
  type: "page-type/place",
  slug: "skill-lock-probe-world-shop",
  title: "Test Shop",
  world: "world/skill-lock-probe-world",
  depth: 0,
  exits: [
    {
      to: "place/skill-lock-probe-world-square",
      way: "Out through the green door.",
      direction: "west",
    },
    {
      to: "place/skill-lock-probe-world-cellar",
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
      knowers: ["lore-disclosure/game-master", "character-player/skill-lock-probe-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/skill-lock-probe-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/skill-lock-probe-player"],
    },
    {
      fact: "The shop's green door stands unlatched from dawn to dusk, and a small bell hangs inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies Place
