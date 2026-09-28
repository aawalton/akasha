import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveLearningCushion = {
  id: "01a0e9f3-f5f6-79dc-9760-b900caf549b6",
  type: "page-type/world-item",
  slug: "super-supportive-learning-cushion",
  title: "Learning cushion",
  world: "world/super-supportive",
  description: "A heavy leather cushion stitched with logograms.",
} as const satisfies WorldItem
