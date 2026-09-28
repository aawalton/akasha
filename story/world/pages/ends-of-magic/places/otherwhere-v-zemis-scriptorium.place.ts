import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVZemisScriptorium = {
  id: "01a0e9f5-b469-7ec5-93b2-cd63da6b9652",
  type: "page-type/place",
  slug: "otherwhere-v-zemis-scriptorium",
  title: "The Zemis Scriptorium",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "The Zemis Scriptorium was a grand library of Insights until the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
