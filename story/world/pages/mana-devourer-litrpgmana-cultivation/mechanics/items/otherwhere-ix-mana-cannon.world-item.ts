import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereIxManaCannon = {
  id: "01a0ea42-1ac1-7a3e-afbc-7366dbdbd3ee",
  type: "page-type/world-item",
  slug: "otherwhere-ix-mana-cannon",
  title: "Mana Cannon",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "A heavy rune-covered tube that fires condensed mana.",
} as const satisfies WorldItem
