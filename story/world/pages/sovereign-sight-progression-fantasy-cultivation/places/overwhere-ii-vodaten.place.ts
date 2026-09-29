import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiVodaten = {
  id: "01a0ed26-0971-74c3-8541-8d0d5b852851",
  type: "page-type/place",
  slug: "overwhere-ii-vodaten",
  title: "Vodaten",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Vodaten is a proper city, the jewel of Kesca Isle and a trade hub for most of the north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vodaten holds Travelspire #03, where the Phaar Region's Aspirants must report.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the Vale, Vodaten lies over the Gnarl and across the sea, two months' travel without hounds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
