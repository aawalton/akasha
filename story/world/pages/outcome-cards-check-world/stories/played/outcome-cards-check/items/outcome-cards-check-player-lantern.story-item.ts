import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardsCheckPlayerLantern = {
  id: "01a17ffe-7d82-7a34-bdad-8f47fe7bd970",
  type: "page-type/story-item",
  slug: "outcome-cards-check-player-lantern",
  title: "Lantern",
  world: "world/outcome-cards-check-world",
  story: "story-played/outcome-cards-check",
  character: "character-player/outcome-cards-check-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies StoryItem
