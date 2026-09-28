import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiInfiniteConstellation = {
  id: "01a0ea41-4b62-795b-acde-46427b9f1543",
  type: "page-type/place",
  slug: "otherwhere-vii-infinite-constellation",
  title: "The Infinite Constellation School",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "The Infinite Constellation School sits on a forested mountain weeks from Ashford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has a lower school of huts and a plaza, and an upper peak behind a blue barrier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is small, poor and in debt, and takes the students no one else wants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its students worship a black-smoke spirit at a scrap-wood shrine, in fear and in jest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
