import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLotta = {
  id: "01a0ea8f-a12c-7198-a723-b332b4d6fe23",
  type: "page-type/lore",
  slug: "otherwhere-xi-lotta",
  title: "Lotta",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lotta",
  facts: [
    {
      fact: "Lotta is a Harrakan baker and grandmother whose granddaughter is a mage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lotta carried stretchers for the wounded on the Plain of the Gods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Lotta is thought to be home in New Harrak after the battle.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
