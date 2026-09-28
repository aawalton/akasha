import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxKingMagul = {
  id: "01a0ea40-95f3-7596-b255-c49e8807001f",
  type: "page-type/lore",
  slug: "otherwhere-ix-king-magul",
  title: "King Magul",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-king-magul",
  facts: [
    {
      fact: "King Magul rules the region around Sun City, a kingdom across the Malar Zone and Materia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Magul dynasty took the throne six hundred years ago, as Farros took the region.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His realm is also called the Magul Empire, where performers bear the worst levies and fines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season King Magul keeps his throne; Markus Brown has never met him.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
