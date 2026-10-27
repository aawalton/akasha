import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const testStoryPlayerLantern = {
  id: "01a17ec8-4447-7970-a7e2-d7805584d1d4",
  type: "page-type/story-item",
  slug: "test-story-player-lantern",
  title: "Lantern",
  world: "world/test-world",
  story: "story-played/test-story",
  character: "character-player/test-story-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-27T19:13:36.325Z",
  updatedAt: "2026-10-27T19:13:36.325Z",
} as const satisfies StoryItem
