import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerCisternWalkway = {
  id: "01a0d43f-d553-7d67-bf86-ef1bdf7a2052",
  type: "page-type/place",
  slug: "the-tower-cistern-walkway",
  title: "The Broken Walkway",
  world: "world/personas",
  within: "place/the-tower-floor-02",
  depth: 2,
  description:
    "A ring of cracked stone walkway just above the waterline, the only dry footing near the entrance. The flood fills the undercroft below it. An empty iron ring is set in the wall above the water.",
  exits: [
    {
      to: "place/the-tower-ember-chamber",
      way: "the descending stair behind (back to floor 1's slab)",
      direction: "down",
    },
    {
      to: "place/the-tower-cistern-deep",
      way: "the submerged passage forward — the only way across is along the walkway ring or through the water itself",
    },
  ],
  facts: [
    {
      fact: "The Broken Walkway is near-dark, lit only by faint phosphorescence on the wet walls.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Deep, cold black water floods the whole undercroft below the Broken Walkway.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The Cistern's water can be drunk, though it tastes mineral and foul.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The Cistern's water is deep enough to drown in.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Place
