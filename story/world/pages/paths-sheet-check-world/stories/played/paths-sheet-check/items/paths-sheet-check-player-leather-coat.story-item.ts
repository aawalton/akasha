import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsSheetCheckPlayerLeatherCoat = {
  id: "01a182db-5bf2-799a-ab5e-f25a030fb6ad",
  type: "page-type/story-item",
  slug: "paths-sheet-check-player-leather-coat",
  title: "Leather Coat",
  world: "world/paths-sheet-check-world",
  story: "story-played/paths-sheet-check",
  character: "character-player/paths-sheet-check-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies StoryItem
