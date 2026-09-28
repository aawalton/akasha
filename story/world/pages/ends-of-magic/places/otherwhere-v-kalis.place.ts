import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVKalis = {
  id: "01a0e9fd-94d4-7ab5-8083-498d5c848361",
  type: "page-type/place",
  slug: "otherwhere-v-kalis",
  title: "Kalis",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Kalis was the seat of an ancient empire whose storm-lit cities spanned oceans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kalis was the site of a notorious Questor conclave and a destructive war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kalis has a Silver Tower and a gold tower of wizards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kalis conclave towers, now dungeons, still dot distant continents.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
