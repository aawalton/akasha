import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const pendingRollTrialWorldSquare = {
  id: "01a183cf-b828-7d5d-bb6d-31c02f1a8cc8",
  type: "page-type/place",
  slug: "pending-roll-trial-world-square",
  title: "Test Square",
  world: "world/pending-roll-trial-world",
  depth: 0,
  exits: [
    {
      to: "place/pending-roll-trial-world-hall",
      way: "Up the steps on the square's north side.",
      direction: "north",
    },
    {
      to: "place/pending-roll-trial-world-shop",
      way: "Through the green door on the east side.",
      direction: "east",
    },
    {
      to: "place/pending-roll-trial-world-cellar",
      way: "Down the stone stair by the well.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "The square is cobbled, with a well at its middle and a bench beside the well.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The well is a round stone shaft with still, clear water far below and a bucket on a rope.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The square's well is a round shaft of fitted stone, its rim waist-high.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The square's well drops a long way, its stone walls darkening further down.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The square's well holds clear water far below its rim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wooden bucket sits on the rim of the square's well, its rope coiled beside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies Place
