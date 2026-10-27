import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerHealingDraught = {
  id: "01a17f4c-d936-7def-b7f7-20566e0ad862",
  type: "page-type/story-item",
  slug: "clone-probe-player-healing-draught",
  title: "Healing Draught",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies StoryItem
