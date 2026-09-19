import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const scrollOfGreaterTeleport = {
  id: "01a0655a-7b7f-7f2d-9b4a-fbe98156844b",
  type: "page-type/world-item",
  slug: "scroll-of-greater-teleport",
  title: "Scroll of Greater Teleport",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
