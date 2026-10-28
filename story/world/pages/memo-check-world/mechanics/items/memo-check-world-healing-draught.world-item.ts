import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const memoCheckWorldHealingDraught = {
  id: "01a1832d-38c0-76dc-b21c-a780d0628044",
  type: "page-type/world-item",
  slug: "memo-check-world-healing-draught",
  title: "Healing Draught",
  world: "world/memo-check-world",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  category: "consumable",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies WorldItem
