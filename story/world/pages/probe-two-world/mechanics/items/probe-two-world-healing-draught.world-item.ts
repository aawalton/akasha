import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const probeTwoWorldHealingDraught = {
  id: "01a17fbf-aff5-7a6e-82c2-f8a340874134",
  type: "page-type/world-item",
  slug: "probe-two-world-healing-draught",
  title: "Healing Draught",
  world: "world/probe-two-world",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  category: "consumable",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies WorldItem
