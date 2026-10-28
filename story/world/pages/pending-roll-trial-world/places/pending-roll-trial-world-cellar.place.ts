import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const pendingRollTrialWorldCellar = {
  id: "01a183cf-b828-7b4d-9252-00ac1b5a5610",
  type: "page-type/place",
  slug: "pending-roll-trial-world-cellar",
  title: "Test Cellar",
  world: "world/pending-roll-trial-world",
  depth: -1,
  exits: [
    {
      to: "place/pending-roll-trial-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/pending-roll-trial-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
  ],
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies Place
