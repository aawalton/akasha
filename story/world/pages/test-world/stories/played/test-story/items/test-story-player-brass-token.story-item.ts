import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const testStoryPlayerBrassToken = {
  id: "01a17ec8-4446-73ce-b60a-aa518effccfd",
  type: "page-type/story-item",
  slug: "test-story-player-brass-token",
  title: "Brass Token",
  world: "world/test-world",
  story: "story-played/test-story",
  character: "character-player/test-story-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-27T19:13:36.325Z",
  updatedAt: "2026-10-27T19:13:36.325Z",
} as const satisfies StoryItem
