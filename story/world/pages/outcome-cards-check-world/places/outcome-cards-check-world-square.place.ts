import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const outcomeCardsCheckWorldSquare = {
  id: "01a17ffe-7d82-7bc8-b1a0-6322715924c6",
  type: "page-type/place",
  slug: "outcome-cards-check-world-square",
  title: "Test Square",
  world: "world/outcome-cards-check-world",
  depth: 0,
  exits: [
    {
      to: "place/outcome-cards-check-world-hall",
      way: "Up the steps on the square's north side.",
      direction: "north",
    },
    {
      to: "place/outcome-cards-check-world-shop",
      way: "Through the green door on the east side.",
      direction: "east",
    },
    {
      to: "place/outcome-cards-check-world-cellar",
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
    {
      fact: "An old tree leans over the square's bench, now and then dropping a dry leaf to the cobbles.",
      knowers: ["lore-disclosure/game-master", "character-player/outcome-cards-check-player"],
    },
  ],
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T01:27:32.680Z",
} as const satisfies Place
