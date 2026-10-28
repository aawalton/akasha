import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const outcomeCardTrialWorldCellar = {
  id: "01a183ae-dc71-7e13-baf5-7d9918c0ba33",
  type: "page-type/place",
  slug: "outcome-card-trial-world-cellar",
  title: "Test Cellar",
  world: "world/outcome-card-trial-world",
  depth: -1,
  exits: [
    {
      to: "place/outcome-card-trial-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/outcome-card-trial-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-card-trial-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-card-trial-player"],
    },
  ],
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies Place
