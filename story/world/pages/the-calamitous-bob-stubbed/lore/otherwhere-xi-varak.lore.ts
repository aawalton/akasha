import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiVarak = {
  id: "01a0ea8b-9d76-7cbf-89af-107eb1b72934",
  type: "page-type/lore",
  slug: "otherwhere-xi-varak",
  title: "Varak",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-varak",
  facts: [
    {
      fact: "Warlord Varak led the Varak clan of Halluria, whose flag is a lean wolf.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Varak clan holds the Varak plains, Halluria's only cereal land.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Varak dueled a red-armored western knight during his invasion of Baran.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The White Orchard's charge crushed Varak's clan at a Baranese border stronghold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Varak's fate is unknown in Baran.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
