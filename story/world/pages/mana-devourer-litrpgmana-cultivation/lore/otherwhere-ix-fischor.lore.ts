import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxFischor = {
  id: "01a0ea40-bcb6-751f-b9d7-647b37bce994",
  type: "page-type/lore",
  slug: "otherwhere-ix-fischor",
  title: "Fischor",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-fischor",
  facts: [
    {
      fact: "Fischor is a metal used mainly for jewelry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some fischor lay among odd coins and metals in an old chest in the Sun City arena depths.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
