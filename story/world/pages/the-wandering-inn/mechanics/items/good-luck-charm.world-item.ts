import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const goodLuckCharm = {
  id: "01a0655a-7b7f-790b-8a5b-b08f555f375a",
  type: "page-type/world-item",
  slug: "good-luck-charm",
  title: "Good Luck Charm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.807Z",
  updatedAt: "2026-09-22T13:30:32.000Z",
} as const satisfies WorldItem
