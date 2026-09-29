import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereXHoldingBag = {
  id: "01a0ea7a-5bda-7011-8518-75682bda3e70",
  type: "page-type/world-item",
  slug: "otherwhere-x-holding-bag",
  title: "Holding Bag",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A small magic pouch that holds far more than its size.",
} as const satisfies WorldItem
