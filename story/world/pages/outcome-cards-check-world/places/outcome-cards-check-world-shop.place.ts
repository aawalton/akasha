import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const outcomeCardsCheckWorldShop = {
  id: "01a17ffe-7d82-7dec-b643-0d80148111e7",
  type: "page-type/place",
  slug: "outcome-cards-check-world-shop",
  title: "Test Shop",
  world: "world/outcome-cards-check-world",
  depth: 0,
  exits: [
    {
      to: "place/outcome-cards-check-world-square",
      way: "Out through the green door.",
      direction: "west",
    },
    {
      to: "place/outcome-cards-check-world-cellar",
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
      knowers: ["lore-disclosure/game-master", "character-player/outcome-cards-check-player"],
    },
    {
      fact: "A lit taper sits on the counter for lighting lanterns.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-cards-check-player"],
    },
    {
      fact: "The door behind the shop's counter opens on wooden steps down to the cellar.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-cards-check-player"],
    },
    {
      fact: "The shop's green door stands unlatched from dawn to dusk, and a small bell hangs inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies Place
