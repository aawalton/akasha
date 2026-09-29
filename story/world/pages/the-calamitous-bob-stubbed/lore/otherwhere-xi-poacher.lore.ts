import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiPoacher = {
  id: "01a0ea7b-36b8-7634-9464-f9cb6210584a",
  type: "page-type/lore",
  slug: "otherwhere-xi-poacher",
  title: "Poacher",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-poacher",
  facts: [
    {
      fact: "Poacher is a gray-haired old woman who leads New Harrak's witchpact crossbows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Poacher has no other name; she was once a poacher.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Poacher is rude and smelly, and her troops follow her anyway.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Poacher led the witchpact marksmen, including the Sisters of the Eye, in every war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Poacher's crossbows fire one-use quarrels infused with spells.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Poacher is with Harrak's victorious army after the Plain of the Gods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
