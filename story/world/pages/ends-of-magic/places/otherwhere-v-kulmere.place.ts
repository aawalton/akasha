import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVKulmere = {
  id: "01a0e9f9-26ec-7171-af5f-56da287e8d2a",
  type: "page-type/place",
  slug: "otherwhere-v-kulmere",
  title: "Kulmere",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-ostren",
  facts: [
    {
      fact: "Kulmere is a village on the edge of Ostren's wilds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
