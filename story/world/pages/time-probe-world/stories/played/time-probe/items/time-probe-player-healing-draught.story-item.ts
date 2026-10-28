import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const timeProbePlayerHealingDraught = {
  id: "01a1802d-b13e-7305-ac7d-7f07057a5d75",
  type: "page-type/story-item",
  slug: "time-probe-player-healing-draught",
  title: "Healing Draught",
  world: "world/time-probe-world",
  story: "story-played/time-probe",
  character: "character-player/time-probe-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies StoryItem
