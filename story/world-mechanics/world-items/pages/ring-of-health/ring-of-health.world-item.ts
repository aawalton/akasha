import type { WorldItem } from "../../world-item.page-type.types.ts"

export const ringOfHealth = {
  id: "01a0655a-7b7f-784a-b857-114259fbedd1",
  pageTypeSlug: "world-item",
  type: "world-item",
  slug: "ring-of-health",
  title: "Ring of Health",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
