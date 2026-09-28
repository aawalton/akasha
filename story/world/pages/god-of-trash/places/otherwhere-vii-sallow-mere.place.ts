import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiSallowMere = {
  id: "01a0ea3e-8162-78a4-9ce8-ca4b8c43443c",
  type: "page-type/place",
  slug: "otherwhere-vii-sallow-mere",
  title: "Sallow Mere",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "Sallow Mere is a reedy marsh and black-water pool two miles south of the Ashford road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ditch by the road drains south into Sallow Mere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ashford folk cut reeds for thatch at the mere's edge and trap eels there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mere's water is foul and brings a flux; mists lie on it at dawn and dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ashford mothers tell children a water sprite lives in the mere and eats boys.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "People have drowned in the mere, and ground there sucks at the feet.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
