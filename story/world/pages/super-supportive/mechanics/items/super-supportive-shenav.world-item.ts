import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveShenav = {
  id: "01a0e9fc-be82-7595-a7ec-b8767fadaecd",
  type: "page-type/world-item",
  slug: "super-supportive-shenav",
  title: "Shenav",
  world: "world/super-supportive",
  description: "An expensive intoxicating Artonan drink in tall black bottles.",
} as const satisfies WorldItem
