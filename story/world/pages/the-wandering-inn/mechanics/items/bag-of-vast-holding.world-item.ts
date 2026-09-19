import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const bagOfVastHolding = {
  id: "01a0655a-7b7f-7f63-82d6-45492d4661ba",
  type: "page-type/world-item",
  slug: "bag-of-vast-holding",
  title: "Bag of Vast Holding",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
