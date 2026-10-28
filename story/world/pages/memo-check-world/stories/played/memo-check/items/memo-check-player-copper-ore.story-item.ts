import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const memoCheckPlayerCopperOre = {
  id: "01a1832d-38c0-7518-9121-b2e5348c48f5",
  type: "page-type/story-item",
  slug: "memo-check-player-copper-ore",
  title: "Copper Ore",
  world: "world/memo-check-world",
  story: "story-played/memo-check",
  character: "character-player/memo-check-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies StoryItem
