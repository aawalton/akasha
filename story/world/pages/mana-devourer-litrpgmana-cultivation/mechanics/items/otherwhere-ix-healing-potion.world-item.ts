import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereIxHealingPotion = {
  id: "01a0ea3f-fe99-7a60-979a-6d3eb4866ac2",
  type: "page-type/world-item",
  slug: "otherwhere-ix-healing-potion",
  title: "Healing Potion",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "A red draught in a small vial that heals the body.",
} as const satisfies WorldItem
