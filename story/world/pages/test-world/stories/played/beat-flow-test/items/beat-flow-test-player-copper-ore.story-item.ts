import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const beatFlowTestPlayerCopperOre = {
  id: "01a17f7f-6e81-7dc1-a06a-c769cca6c5d2",
  type: "page-type/story-item",
  slug: "beat-flow-test-player-copper-ore",
  title: "Copper Ore",
  world: "world/test-world",
  story: "story-played/beat-flow-test",
  character: "character-player/beat-flow-test-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies StoryItem
