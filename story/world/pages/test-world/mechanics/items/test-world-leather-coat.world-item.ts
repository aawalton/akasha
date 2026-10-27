import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const testWorldLeatherCoat = {
  id: "01a17ec5-a3e4-7fb2-bdf9-aafaf957475d",
  type: "page-type/world-item",
  slug: "test-world-leather-coat",
  title: "Leather Coat",
  world: "world/test-world",
  description: "A brown leather coat, long enough to cover the knees.",
  category: "armor",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldItem
