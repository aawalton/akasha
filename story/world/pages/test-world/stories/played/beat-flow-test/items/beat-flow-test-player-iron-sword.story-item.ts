import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const beatFlowTestPlayerIronSword = {
  id: "01a17f7f-6e81-7738-9c81-7ad7ed0af576",
  type: "page-type/story-item",
  slug: "beat-flow-test-player-iron-sword",
  title: "Iron Sword",
  world: "world/test-world",
  story: "story-played/beat-flow-test",
  character: "character-player/beat-flow-test-player",
  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies StoryItem
