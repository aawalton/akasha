import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const undoCheckPlayerHealingDraught = {
  id: "01a18309-e114-7d48-8497-b1621a7ad2af",
  type: "page-type/story-item",
  slug: "undo-check-player-healing-draught",
  title: "Healing Draught",
  world: "world/undo-check-world",
  story: "story-played/undo-check",
  character: "character-player/undo-check-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies StoryItem
