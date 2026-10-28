import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const undoCheckPlayerLantern = {
  id: "01a18309-e114-7dfd-a5fa-d589943f0819",
  type: "page-type/story-item",
  slug: "undo-check-player-lantern",
  title: "Lantern",
  world: "world/undo-check-world",
  story: "story-played/undo-check",
  character: "character-player/undo-check-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies StoryItem
