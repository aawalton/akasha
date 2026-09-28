import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportivePezyva = {
  id: "01a0e9f9-1fa2-7e34-bc94-b04e6bb16b72",
  type: "page-type/world-item",
  slug: "super-supportive-pezyva",
  title: "pezyva",
  world: "world/super-supportive",
  description: "An Artonan sleeveless outer vest with a diagonal closure and two triangular tails.",
} as const satisfies WorldItem
