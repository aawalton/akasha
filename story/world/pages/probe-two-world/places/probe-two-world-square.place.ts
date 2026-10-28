import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const probeTwoWorldSquare = {
  id: "01a17fbf-aff5-7b25-8130-faaa2017bb25",
  type: "page-type/place",
  slug: "probe-two-world-square",
  title: "Test Square",
  world: "world/probe-two-world",
  depth: 0,
  exits: [
    {
      to: "place/probe-two-world-hall",
      way: "Up the steps on the square's north side.",
      direction: "north",
    },
    {
      to: "place/probe-two-world-shop",
      way: "Through the green door on the east side.",
      direction: "east",
    },
    {
      to: "place/probe-two-world-cellar",
      way: "Down the stone stair by the well.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "The square is cobbled, with a well at its middle and a bench beside the well.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "The well is a round stone shaft with still, clear water far below and a bucket on a rope.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The square's well is a round shaft of fitted stone, its rim waist-high.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "The square's well drops a long way, its stone walls darkening further down.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "The square's well holds clear water far below its rim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wooden bucket sits on the rim of the square's well, its rope coiled beside it.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "The bench beside the square's well is wooden.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "The cobbles around the square's well are worn smooth.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "The stone blocks of the square's well rim are joined tight, leaving only thin seams.",
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
  ],
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-28T00:02:26.999Z",
} as const satisfies Place
