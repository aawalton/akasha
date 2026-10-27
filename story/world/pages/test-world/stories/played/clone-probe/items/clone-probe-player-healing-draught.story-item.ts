import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerHealingDraught = {
  id: "01a17f3e-4458-754e-b1a0-3f9ee4a48f61",
  type: "page-type/story-item",
  slug: "clone-probe-player-healing-draught",
  title: "Healing Draught",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies StoryItem
