import type { WorldItem } from "../../world-item.page-type.types.ts"

export const stormShip = {
  id: "01a0655a-7b80-7f2d-a5ff-b4f0e6c4cec5",
  pageTypeSlug: "world-item",
  type: "world-item",
  slug: "storm-ship",
  title: "Storm Ship",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
