import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const undoCheckWorldIronSword = {
  id: "01a18309-e114-7c2d-8d53-c24f5f4223f7",
  type: "page-type/world-item",
  slug: "undo-check-world-iron-sword",
  title: "Iron Sword",
  world: "world/undo-check-world",
  description: "A plain iron sword with a leather grip.",
  category: "weapon",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies WorldItem
