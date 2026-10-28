import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const outcomeCardTrialWorldShop = {
  id: "01a183ae-dc71-7255-81c7-496783e055d3",
  type: "page-type/place",
  slug: "outcome-card-trial-world-shop",
  title: "Test Shop",
  world: "world/outcome-card-trial-world",
  depth: 0,
  exits: [
    {
      to: "place/outcome-card-trial-world-square",
      way: "Out through the green door.",
      direction: "west",
    },
    {
      to: "place/outcome-card-trial-world-cellar",
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
      knowers: ["lore-disclosure/game-master", "character-player/outcome-card-trial-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-card-trial-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-card-trial-player"],
    },
    {
      fact: "The shop's green door stands unlatched from dawn to dusk, and a small bell hangs inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies Place
