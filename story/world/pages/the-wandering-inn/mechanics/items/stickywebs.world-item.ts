import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const stickywebs = {
  id: "01a0655a-7b80-7adc-98ce-3d0a6daf2050",
  type: "page-type/world-item",
  slug: "stickywebs",
  title: "Stickywebs",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.808Z",
  updatedAt: "2026-09-22T13:30:32.000Z",
} as const satisfies WorldItem
