import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxCleansingPowders = {
  id: "01a0ea40-bcb5-751f-ac91-5ea4a9b81428",
  type: "page-type/lore",
  slug: "otherwhere-ix-cleansing-powders",
  title: "Cleansing Powders",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-cleansing-powders",
  facts: [
    {
      fact: "Cleansing powders come in small paper bags and wash robes and bedsheets clean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The arena owner Drathok hands out cleansing powders to his fighters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cleansing the body by magic is a luxury; gods can do it with a torrent of water that dries at once.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
