import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereIxEssenceStones = {
  id: "01a0ea40-2bb0-792f-bf59-f7169053107a",
  type: "page-type/world-item",
  slug: "otherwhere-ix-essence-stones",
  title: "Essence Stones",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["Essence Stone"],
  description: "A small gemstone that stores mana.",
} as const satisfies WorldItem
