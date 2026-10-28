import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsSheetCheckPlayerLantern = {
  id: "01a182db-5bf2-78a9-9286-b8c328dcdd6b",
  type: "page-type/story-item",
  slug: "paths-sheet-check-player-lantern",
  title: "Lantern",
  world: "world/paths-sheet-check-world",
  story: "story-played/paths-sheet-check",
  character: "character-player/paths-sheet-check-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies StoryItem
