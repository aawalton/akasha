import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const stormShip = {
  id: "01a0655a-7b80-7f2d-a5ff-b4f0e6c4cec5",
  type: "page-type/world-item",
  slug: "storm-ship",
  title: "Storm Ship",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
