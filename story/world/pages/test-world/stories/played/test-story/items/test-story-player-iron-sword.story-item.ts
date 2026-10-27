import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const testStoryPlayerIronSword = {
  id: "01a17ec8-4447-7b8f-84ce-f555af8a3b67",
  type: "page-type/story-item",
  slug: "test-story-player-iron-sword",
  title: "Iron Sword",
  world: "world/test-world",
  story: "story-played/test-story",
  character: "character-player/test-story-player",
  slot: "item-slot/main-hand",
  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-27T19:13:36.325Z",
  updatedAt: "2026-10-27T19:13:36.325Z",
} as const satisfies StoryItem
