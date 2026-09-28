import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiDarkCrystalCavern = {
  id: "01a0e9be-00c7-7f5a-a661-bc827e3958f6",
  type: "page-type/place",
  slug: "otherwhere-ii-dark-crystal-cavern",
  title: "The Dark Crystal Cavern",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-bladewind-badlands",
  facts: [
    {
      fact: "The Dark Crystal Cavern is a vast geode whose giant crystals drink light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The crystals convert life mana into darkness and crystalline mana until they break.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
