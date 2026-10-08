import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const wagon = {
  id: "01a0655a-7b80-7fd2-a093-d0953f96257d",
  type: "page-type/world-item",
  slug: "wagon",
  title: "Wagon",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.808Z",
  updatedAt: "2026-09-22T13:30:32.000Z",
} as const satisfies WorldItem
