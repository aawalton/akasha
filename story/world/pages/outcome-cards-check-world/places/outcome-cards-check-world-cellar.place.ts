import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const outcomeCardsCheckWorldCellar = {
  id: "01a17ffe-7d82-7846-b1f7-00c8f89a8fcc",
  type: "page-type/place",
  slug: "outcome-cards-check-world-cellar",
  title: "Test Cellar",
  world: "world/outcome-cards-check-world",
  depth: -1,
  exits: [
    {
      to: "place/outcome-cards-check-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/outcome-cards-check-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-cards-check-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-cards-check-player"],
    },
  ],
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies Place
