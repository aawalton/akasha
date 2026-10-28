import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const timeProbeWorldHealingDraught = {
  id: "01a1802d-b13e-7856-ab32-5793fb7e35fd",
  type: "page-type/world-item",
  slug: "time-probe-world-healing-draught",
  title: "Healing Draught",
  world: "world/time-probe-world",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  category: "consumable",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies WorldItem
