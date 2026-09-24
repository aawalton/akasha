import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerCisternWalkway = {
  id: "01a0d43f-d553-7d67-bf86-ef1bdf7a2052",
  type: "page-type/place",
  slug: "the-tower-cistern-walkway",
  title: "The Broken Walkway",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-02",
  depth: 2,
  description:
    "A ring of cracked stone walkway just above the waterline, the only dry footing near the entrance. The flood fills the undercroft below it. An empty iron ring is set in the wall above the water.",
  exits: [
    {
      to: "place/the-tower-ember-chamber",
      way: "the descending stair behind (back to floor 1's slab)",
    },
    {
      to: "place/the-tower-cistern-deep",
      way: "the submerged passage forward — the only way across is along the walkway ring or through the water itself",
    },
  ],
  facts: [
    "The Broken Walkway is near-dark, lit only by faint phosphorescence on the wet walls.",
    "Deep, cold black water floods the whole undercroft below the Broken Walkway.",
    "The Cistern's water can be drunk, though it tastes mineral and foul.",
    "The Cistern's water is deep enough to drown in.",
  ],
} as const satisfies Place
