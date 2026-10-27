import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const probeTwoPlayerCopperOre = {
  id: "01a17fbf-aff5-748b-9acc-fb78ce02d9a3",
  type: "page-type/story-item",
  slug: "probe-two-player-copper-ore",
  title: "Copper Ore",
  world: "world/probe-two-world",
  story: "story-played/probe-two",
  character: "character-player/probe-two-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies StoryItem
