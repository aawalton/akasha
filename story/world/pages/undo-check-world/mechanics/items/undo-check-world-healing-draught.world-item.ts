import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const undoCheckWorldHealingDraught = {
  id: "01a18309-e114-7df2-8054-7ceb138c2c3f",
  type: "page-type/world-item",
  slug: "undo-check-world-healing-draught",
  title: "Healing Draught",
  world: "world/undo-check-world",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  category: "consumable",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies WorldItem
