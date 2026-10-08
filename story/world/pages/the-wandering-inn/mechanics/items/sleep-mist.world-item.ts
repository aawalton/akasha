import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const sleepMist = {
  id: "01a0655a-7b7f-7556-bcbd-e5640af6f3cb",
  type: "page-type/world-item",
  slug: "sleep-mist",
  title: "Sleep Mist",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.807Z",
  updatedAt: "2026-09-22T13:30:32.000Z",
} as const satisfies WorldItem
