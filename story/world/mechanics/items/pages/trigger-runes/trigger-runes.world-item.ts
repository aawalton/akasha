import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const triggerRunes = {
  id: "01a0655a-7b80-7740-94b6-69e0507fe326",
  type: "page-type/world-item",
  slug: "trigger-runes",
  title: "Trigger Runes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
