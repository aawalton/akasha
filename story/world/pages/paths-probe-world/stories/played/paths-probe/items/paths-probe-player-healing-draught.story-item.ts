import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsProbePlayerHealingDraught = {
  id: "01a18008-7533-7dfb-8cd0-ed9cb1687f55",
  type: "page-type/story-item",
  slug: "paths-probe-player-healing-draught",
  title: "Healing Draught",
  world: "world/paths-probe-world",
  story: "story-played/paths-probe",
  character: "character-player/paths-probe-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies StoryItem
