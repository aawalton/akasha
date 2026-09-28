import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGodsfall = {
  id: "01a0e9f9-e637-7674-8375-0148a5006386",
  type: "page-type/place",
  slug: "otherwhere-v-godsfall",
  title: "Godsfall",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-ostren",
  facts: [
    {
      fact: "Godsfall is a place in Ostren, the continent where the Questors killed gods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
