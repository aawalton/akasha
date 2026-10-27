import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const testWorldIronSword = {
  id: "01a17ec5-a3e4-7902-ac5c-5b7a74404339",
  type: "page-type/world-item",
  slug: "test-world-iron-sword",
  title: "Iron Sword",
  world: "world/test-world",
  description: "A plain iron sword with a leather grip.",
  category: "weapon",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldItem
