import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const timeProbeWorldCellar = {
  id: "01a1802d-b13e-7279-b73f-d67ac1252008",
  type: "page-type/place",
  slug: "time-probe-world-cellar",
  title: "Test Cellar",
  world: "world/time-probe-world",
  depth: -1,
  exits: [
    {
      to: "place/time-probe-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/time-probe-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/time-probe-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/time-probe-player"],
    },
  ],
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies Place
