import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const sleepMist = {
  id: "01a0655a-7b7f-7556-bcbd-e5640af6f3cb",
  type: "page-type/world-item",
  slug: "sleep-mist",
  title: "Sleep Mist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
