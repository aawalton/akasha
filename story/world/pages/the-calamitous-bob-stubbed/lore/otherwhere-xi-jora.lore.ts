import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJora = {
  id: "01a0ea89-b5d1-75ce-acdc-cf54f6d84764",
  type: "page-type/lore",
  slug: "otherwhere-xi-jora",
  title: "Jora",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jora",
  facts: [
    {
      fact: "Jora is a foolish lad of a Harrakan coastal village below the dragon's peak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jora climbed to the den of the dragon Old White Death to loot its treasure.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jora is thought to live in his village still this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:21:28.657Z",
  updatedAt: "2026-09-29T00:21:35.000Z",
} as const satisfies Lore
