import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportivePromiseStick = {
  id: "01a0e9f3-f5f7-7861-9e18-1a6123572870",
  type: "page-type/world-item",
  slug: "super-supportive-promise-stick",
  title: "Promise stick",
  world: "world/super-supportive",
  description: "A polished wooden stick.",
} as const satisfies WorldItem
