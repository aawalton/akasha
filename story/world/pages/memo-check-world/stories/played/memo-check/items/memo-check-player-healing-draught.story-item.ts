import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const memoCheckPlayerHealingDraught = {
  id: "01a1832d-38c0-7f7f-90da-07b71e50873b",
  type: "page-type/story-item",
  slug: "memo-check-player-healing-draught",
  title: "Healing Draught",
  world: "world/memo-check-world",
  story: "story-played/memo-check",
  character: "character-player/memo-check-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies StoryItem
