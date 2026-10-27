import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const testWorldCopperOre = {
  id: "01a17ec5-a3e4-71e6-bbf0-8f6c3ba5f34b",
  type: "page-type/world-item",
  slug: "test-world-copper-ore",
  title: "Copper Ore",
  world: "world/test-world",
  description: "A lump of green-streaked rock holding copper.",
  category: "material",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldItem
