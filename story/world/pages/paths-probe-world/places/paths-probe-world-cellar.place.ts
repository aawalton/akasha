import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const pathsProbeWorldCellar = {
  id: "01a18008-7533-703d-a0e7-fd42459a7cd3",
  type: "page-type/place",
  slug: "paths-probe-world-cellar",
  title: "Test Cellar",
  world: "world/paths-probe-world",
  depth: -1,
  exits: [
    {
      to: "place/paths-probe-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/paths-probe-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/paths-probe-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/paths-probe-player"],
    },
  ],
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies Place
