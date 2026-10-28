import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const undoCheckPlayerBrassToken = {
  id: "01a18309-e114-7362-b9ed-3917b306f8e4",
  type: "page-type/story-item",
  slug: "undo-check-player-brass-token",
  title: "Brass Token",
  world: "world/undo-check-world",
  story: "story-played/undo-check",
  character: "character-player/undo-check-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies StoryItem
