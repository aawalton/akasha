import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardsCheckPlayerBrassToken = {
  id: "01a17ffe-7d82-7cae-90e0-87064eac5b77",
  type: "page-type/story-item",
  slug: "outcome-cards-check-player-brass-token",
  title: "Brass Token",
  world: "world/outcome-cards-check-world",
  story: "story-played/outcome-cards-check",
  character: "character-player/outcome-cards-check-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies StoryItem
