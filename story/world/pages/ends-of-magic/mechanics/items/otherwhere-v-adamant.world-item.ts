import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVAdamant = {
  id: "01a0ea02-a52c-7dd5-87d4-8f0f77a1c1ce",
  type: "page-type/world-item",
  slug: "otherwhere-v-adamant",
  title: "Adamant",
  world: "world/ends-of-magic",
  aliases: ["adamantium"],
  description: "A legendary dark metal.",
} as const satisfies WorldItem
