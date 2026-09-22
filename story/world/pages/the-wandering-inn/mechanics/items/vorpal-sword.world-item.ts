import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const vorpalSword = {
  id: "01a0655a-7b80-7686-9bce-b046ad02a233",
  type: "page-type/world-item",
  slug: "vorpal-sword",
  title: "Vorpal Sword",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldItem
