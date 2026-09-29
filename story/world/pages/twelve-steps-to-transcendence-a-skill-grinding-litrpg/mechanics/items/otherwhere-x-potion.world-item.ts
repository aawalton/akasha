import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereXPotion = {
  id: "01a0ea7a-5bda-7e08-911e-2b6014530227",
  type: "page-type/world-item",
  slug: "otherwhere-x-potion",
  title: "Potion",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A magical draught carried on hunts.",
} as const satisfies WorldItem
