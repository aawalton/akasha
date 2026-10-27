import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const testWorldHealingDraught = {
  id: "01a17ec5-a3e4-7034-9e78-61a1ef06030d",
  type: "page-type/world-item",
  slug: "test-world-healing-draught",
  title: "Healing Draught",
  world: "world/test-world",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  category: "consumable",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:57:14.595Z",
} as const satisfies WorldItem
