import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const memoCheckWorldIronSword = {
  id: "01a1832d-38c0-722a-bc59-129e4fc5a4ef",
  type: "page-type/world-item",
  slug: "memo-check-world-iron-sword",
  title: "Iron Sword",
  world: "world/memo-check-world",
  description: "A plain iron sword with a leather grip.",
  category: "weapon",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies WorldItem
