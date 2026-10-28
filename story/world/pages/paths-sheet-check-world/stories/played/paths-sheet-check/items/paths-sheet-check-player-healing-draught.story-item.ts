import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsSheetCheckPlayerHealingDraught = {
  id: "01a182db-5bf2-75be-ac31-db1fb407c607",
  type: "page-type/story-item",
  slug: "paths-sheet-check-player-healing-draught",
  title: "Healing Draught",
  world: "world/paths-sheet-check-world",
  story: "story-played/paths-sheet-check",
  character: "character-player/paths-sheet-check-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies StoryItem
