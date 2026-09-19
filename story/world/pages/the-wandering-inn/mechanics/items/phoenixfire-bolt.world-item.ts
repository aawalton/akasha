import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const phoenixfireBolt = {
  id: "01a0655a-7b7f-70bc-825c-7e045db96e57",
  type: "page-type/world-item",
  slug: "phoenixfire-bolt",
  title: "Phoenixfire Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
