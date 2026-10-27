import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const beatFlowTestPlayerLeatherCoat = {
  id: "01a17f7f-6e81-74aa-8dcb-5fefb4d5db4c",
  type: "page-type/story-item",
  slug: "beat-flow-test-player-leather-coat",
  title: "Leather Coat",
  world: "world/test-world",
  story: "story-played/beat-flow-test",
  character: "character-player/beat-flow-test-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies StoryItem
