import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardsCheckPlayerIronSword = {
  id: "01a17ffe-7d82-7ca6-9133-be7e7513f3f4",
  type: "page-type/story-item",
  slug: "outcome-cards-check-player-iron-sword",
  title: "Iron Sword",
  world: "world/outcome-cards-check-world",
  story: "story-played/outcome-cards-check",
  character: "character-player/outcome-cards-check-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies StoryItem
