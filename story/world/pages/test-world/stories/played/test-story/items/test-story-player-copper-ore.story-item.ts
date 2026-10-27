import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const testStoryPlayerCopperOre = {
  id: "01a17ec8-4446-799f-b800-9446dfbec17c",
  type: "page-type/story-item",
  slug: "test-story-player-copper-ore",
  title: "Copper Ore",
  world: "world/test-world",
  story: "story-played/test-story",
  character: "character-player/test-story-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-27T19:13:36.325Z",
  updatedAt: "2026-10-27T19:13:36.325Z",
} as const satisfies StoryItem
