import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVChokizEstate = {
  id: "01a0e9f3-448b-7097-a3ef-67f13ae9df9b",
  type: "page-type/place",
  slug: "otherwhere-v-chokiz-estate",
  title: "The Chokiz Estate",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest",
  facts: [
    {
      fact: "The Chokiz estate is a mage family's holding in Giantsrest, with its own parkland.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The estate has an industrial district of workshops worked by slaves.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
