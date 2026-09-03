import type { WorldItem } from "../../world-item.page-type.ts"

export const stormShip = {
  id: "01a0655a-7b80-7f2d-a5ff-b4f0e6c4cec5",
  pageTypeSlug: "world-item",
  slug: "storm-ship",
  title: "Storm Ship",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
