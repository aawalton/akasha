import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVDrozahn = {
  id: "01a0e9f3-448b-7c9e-96ed-f13cbd91cb57",
  type: "page-type/place",
  slug: "otherwhere-v-drozahn",
  title: "Drozahn",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest",
  facts: [
    {
      fact: "Drozahn is an obelisk-spire, the tallest tower in Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ruling council's chamber sits atop Drozahn and is hundreds of feet across.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The chamber's enchantments see anything in view of the spire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The chamber's enchantments conjure maps in the air and call up the city's archives.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
