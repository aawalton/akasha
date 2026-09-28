import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSwallowBox = {
  id: "01a0e9f8-6bb4-7a22-909b-f6c32cab0a54",
  type: "page-type/world-item",
  slug: "super-supportive-swallow-box",
  title: "swallow box",
  world: "world/super-supportive",
  description: "A container that swallows large objects.",
} as const satisfies WorldItem
