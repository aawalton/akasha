import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSaltMountains = {
  id: "01a0ea8c-0796-733b-8a44-d40c9cc9bd61",
  type: "page-type/place",
  slug: "otherwhere-xi-salt-mountains",
  title: "The Salt Mountains",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-vizim",
  facts: [
    {
      fact: "The Salt Mountains are squat, color-striped mountains in Vizim, between Ravinport and Sandsong.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Salt pools lie among the Salt Mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Salt flower, brown-mana salt crystals, is gathered from the Salt Mountains' pools.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pass crosses the Salt Mountains, marked by a statue of a singing woman.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sandsong's border city of Barrier guards the pass through the Salt Mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From Ravinport it is five days to the top of the Salt Mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
