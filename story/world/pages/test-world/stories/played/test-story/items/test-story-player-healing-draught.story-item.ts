import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const testStoryPlayerHealingDraught = {
  id: "01a17ec8-4447-726c-88ee-8957e9c93abf",
  type: "page-type/story-item",
  slug: "test-story-player-healing-draught",
  title: "Healing Draught",
  world: "world/test-world",
  story: "story-played/test-story",
  character: "character-player/test-story-player",
  quantity: 3,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds.",
  createdAt: "2026-10-27T19:13:36.325Z",
  updatedAt: "2026-10-27T19:13:36.325Z",
} as const satisfies StoryItem
