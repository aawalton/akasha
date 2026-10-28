import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsSheetCheckPlayerCopperOre = {
  id: "01a182db-5bf2-7d53-8f73-8a4397a1a6fd",
  type: "page-type/story-item",
  slug: "paths-sheet-check-player-copper-ore",
  title: "Copper Ore",
  world: "world/paths-sheet-check-world",
  story: "story-played/paths-sheet-check",
  character: "character-player/paths-sheet-check-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies StoryItem
