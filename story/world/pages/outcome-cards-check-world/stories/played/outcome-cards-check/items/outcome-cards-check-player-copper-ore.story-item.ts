import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardsCheckPlayerCopperOre = {
  id: "01a17ffe-7d82-72ce-86f0-85bc9cd6be13",
  type: "page-type/story-item",
  slug: "outcome-cards-check-player-copper-ore",
  title: "Copper Ore",
  world: "world/outcome-cards-check-world",
  story: "story-played/outcome-cards-check",
  character: "character-player/outcome-cards-check-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies StoryItem
