import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveChainLink = {
  id: "01a0e9f9-1fa0-7b0c-8cb4-1a0b722629f7",
  type: "page-type/world-item",
  slug: "super-supportive-chain-link",
  title: "chain link",
  world: "world/super-supportive",
  description: "An inch-long silver rounded rectangle, one link of a Palace reward chain.",
} as const satisfies WorldItem
