import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const testWorldBrassToken = {
  id: "01a17ec5-a3e4-71f2-a739-91c8124a85f6",
  type: "page-type/world-item",
  slug: "test-world-brass-token",
  title: "Brass Token",
  world: "world/test-world",
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldItem
