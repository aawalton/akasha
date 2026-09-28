import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxPrinceSalthor = {
  id: "01a0ea40-95f3-77d8-b3d0-f05e328fefd0",
  type: "page-type/lore",
  slug: "otherwhere-ix-prince-salthor",
  title: "Prince Salthor",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-prince-salthor",
  facts: [
    {
      fact: "Prince Salthor is a prince who speaks with a strange accent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Salthor is a guest at Elasar's private auction for the elite of Sun City.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Prince Salthor's whereabouts are unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
