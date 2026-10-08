import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVBrokenContinent = {
  id: "01a0e9f5-4f83-7488-8a6c-4db494b7b464",
  type: "page-type/place",
  slug: "otherwhere-v-broken-continent",
  title: "The Broken Continent",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "The broken continent is the land where the Questor Brox struck down the god Quenfi.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:39:23.139Z",
  updatedAt: "2026-09-28T21:39:26.000Z",
} as const satisfies Place
