import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const captureNet = {
  id: "01a0655a-7b7f-761a-8aa2-0e5fbfbf9171",
  type: "page-type/world-item",
  slug: "capture-net",
  title: "Capture Net",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
