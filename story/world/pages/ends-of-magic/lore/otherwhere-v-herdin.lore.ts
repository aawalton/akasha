import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHerdin = {
  id: "01a0e9fb-eb72-789e-ba92-80282cadc2bb",
  type: "page-type/lore",
  slug: "otherwhere-v-herdin",
  title: "Herdin",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-herdin",
  facts: [
    {
      fact: "Herdin is a woman of Gemore with dreadlocks, active in the city's affairs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Herdin lives in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:46:36.274Z",
  updatedAt: "2026-09-28T21:46:39.000Z",
} as const satisfies Lore
