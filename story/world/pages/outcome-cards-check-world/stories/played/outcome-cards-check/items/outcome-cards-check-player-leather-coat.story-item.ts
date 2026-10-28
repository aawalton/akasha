import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardsCheckPlayerLeatherCoat = {
  id: "01a17ffe-7d82-729a-b07b-bed4b1bf0e15",
  type: "page-type/story-item",
  slug: "outcome-cards-check-player-leather-coat",
  title: "Leather Coat",
  world: "world/outcome-cards-check-world",
  story: "story-played/outcome-cards-check",
  character: "character-player/outcome-cards-check-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies StoryItem
