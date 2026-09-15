import type { WorldItem } from "akasha/story/world-mechanic/world-item/world-item.page-type.types.ts"

export const potionsOfTales = {
  id: "01a0655a-7b7f-7cba-95f3-aea2340d1df3",
  type: "world-item",
  slug: "potions-of-tales",
  title: "Potions of Tales",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
