import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const memoCheckPlayerLantern = {
  id: "01a1832d-38c0-7a8f-984a-ad957116a4b4",
  type: "page-type/story-item",
  slug: "memo-check-player-lantern",
  title: "Lantern",
  world: "world/memo-check-world",
  story: "story-played/memo-check",
  character: "character-player/memo-check-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies StoryItem
