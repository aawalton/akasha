import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const skillLockProbeWorldCellar = {
  id: "01a17ff8-9a7f-70c7-8cbb-c3b8a352a72e",
  type: "page-type/place",
  slug: "skill-lock-probe-world-cellar",
  title: "Test Cellar",
  world: "world/skill-lock-probe-world",
  depth: -1,
  exits: [
    {
      to: "place/skill-lock-probe-world-square",
      way: "Up the stone stair to the well.",
      direction: "up",
    },
    {
      to: "place/skill-lock-probe-world-shop",
      way: "Up the wooden steps to the shop's back door.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The cellar is cool and dry, with barrels along one wall and a single lamp hook.",
      knowers: ["lore-disclosure/game-master", "character-player/skill-lock-probe-player"],
    },
    {
      fact: "A stone stair at the cellar's far end comes up by the well in the square.",
      knowers: ["lore-disclosure/game-master", "character-player/skill-lock-probe-player"],
    },
  ],
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies Place
