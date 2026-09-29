import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiiHarborHouse = {
  id: "01a0ea7b-e9d1-718d-a074-98dd18e80f3a",
  type: "page-type/place",
  slug: "otherwhere-iii-harbor-house",
  title: "Harbor House",
  world: "world/super-supportive",
  facts: [
    {
      fact: "Harbor House is a women's shelter in an old church hall on Sunnyside Avenue, in Uptown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a ten-minute walk from the Uptown Memorial ER.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  within: "place/otherwhere-iii-chicago",
} as const satisfies Place
