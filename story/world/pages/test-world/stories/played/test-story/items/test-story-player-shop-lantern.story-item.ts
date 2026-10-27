import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const testStoryPlayerShopLantern = {
  id: "01a17f0a-b98f-75c4-b982-82d081995f76",
  type: "page-type/story-item",
  slug: "test-story-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/test-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/test-story",
  character: "character-player/test-story-player",
  createdAt: "2026-10-27T20:26:11.727Z",
  updatedAt: "2026-10-27T20:26:11.727Z",
} as const satisfies StoryItem
