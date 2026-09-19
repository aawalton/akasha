import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const potionsOfBlast = {
  id: "01a0655a-7b7f-715b-87dc-62ca7fc79be6",
  type: "page-type/world-item",
  slug: "potions-of-blast",
  title: "Potions of Blast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
