import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const testWorldLantern = {
  id: "01a17ec5-a3e4-7338-adc4-7d594bb5ad35",
  type: "page-type/world-item",
  slug: "test-world-lantern",
  title: "Lantern",
  world: "world/test-world",
  description: "A tin lantern with a glass window and a wire handle.",
  category: "tool",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldItem
