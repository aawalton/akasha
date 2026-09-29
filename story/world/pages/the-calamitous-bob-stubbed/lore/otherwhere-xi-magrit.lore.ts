import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMagrit = {
  id: "01a0ea80-4334-7c64-adda-ba0ff8295671",
  type: "page-type/lore",
  slug: "otherwhere-xi-magrit",
  title: "Magrit",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-magrit",
  facts: [
    {
      fact: "Magrit is an apprentice witch of the Path of the Root in New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Magrit's witches are contemplative, attuned to the land, and bring rain when they argue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Magrit lives at the Root witches' grove by the rail line near Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
