import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const pendingRollTrialWorldHealingDraught = {
  id: "01a183cf-b828-7beb-ae3a-92254fc8f47c",
  type: "page-type/world-item",
  slug: "pending-roll-trial-world-healing-draught",
  title: "Healing Draught",
  world: "world/pending-roll-trial-world",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  category: "consumable",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies WorldItem
