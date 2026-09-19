import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const scrollsOfResurrection = {
  id: "01a0655a-7b7f-738d-bcf9-3234821477e0",
  type: "page-type/world-item",
  slug: "scrolls-of-resurrection",
  title: "Scrolls of Resurrection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
