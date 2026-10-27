import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const testStoryPlayerLeatherCoat = {
  id: "01a17ec8-4447-7db2-9c5a-4613a9f7257d",
  type: "page-type/story-item",
  slug: "test-story-player-leather-coat",
  title: "Leather Coat",
  world: "world/test-world",
  story: "story-played/test-story",
  character: "character-player/test-story-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-27T19:13:36.325Z",
  updatedAt: "2026-10-27T19:13:36.325Z",
} as const satisfies StoryItem
