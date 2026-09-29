import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereViiWoodenClogs = {
  id: "01a0eaba-e61b-7c23-a6e3-5b844aa167f6",
  type: "page-type/world-item",
  slug: "otherwhere-vii-wooden-clogs",
  title: "Wooden Clogs",
  world: "world/god-of-trash",
  description: "A pair of carved wooden clogs, worn smooth inside and cracked at one heel.",
} as const satisfies WorldItem
