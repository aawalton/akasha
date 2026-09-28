import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereIxChameleonPotion = {
  id: "01a0ea3f-fe99-725b-a244-c3923fa4205a",
  type: "page-type/world-item",
  slug: "otherwhere-ix-chameleon-potion",
  title: "Chameleon Potion",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "A potion that makes its drinker blend into their surroundings.",
} as const satisfies WorldItem
