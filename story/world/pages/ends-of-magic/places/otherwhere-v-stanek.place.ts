import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVStanek = {
  id: "01a0e9f9-26ed-7864-afc1-a79e2d7f4969",
  type: "page-type/place",
  slug: "otherwhere-v-stanek",
  title: "Stanek",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-ostren",
  facts: [
    {
      fact: "Stanek is a village on the edge of Ostren's wilds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:43:34.893Z",
  updatedAt: "2026-09-28T21:43:38.000Z",
} as const satisfies Place
