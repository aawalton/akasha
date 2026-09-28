import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVYrosa = {
  id: "01a0e9f5-b469-7179-9150-e66e1835cc9f",
  type: "page-type/place",
  slug: "otherwhere-v-yrosa",
  title: "Yrosa",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Yrosa was a city that fell to the Ending of Fire more than 2000 years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Keihona survived the same Ending of Fire that destroyed Yrosa.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
