import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const skillLockProbeWorldHealingDraught = {
  id: "01a17ff8-9a7f-73d5-a870-5063529a31d1",
  type: "page-type/world-item",
  slug: "skill-lock-probe-world-healing-draught",
  title: "Healing Draught",
  world: "world/skill-lock-probe-world",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  category: "consumable",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies WorldItem
