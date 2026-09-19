import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const stickywebs = {
  id: "01a0655a-7b80-7adc-98ce-3d0a6daf2050",
  type: "page-type/world-item",
  slug: "stickywebs",
  title: "Stickywebs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
