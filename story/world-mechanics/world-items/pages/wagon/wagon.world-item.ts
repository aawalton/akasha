import type { WorldItem } from "../../world-item.page-type.types.ts"

export const wagon = {
  id: "01a0655a-7b80-7fd2-a093-d0953f96257d",
  pageTypeSlug: "world-item",
  type: "world-item",
  slug: "wagon",
  title: "Wagon",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
