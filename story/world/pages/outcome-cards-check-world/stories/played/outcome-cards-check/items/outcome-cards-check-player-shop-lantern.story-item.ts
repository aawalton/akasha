import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardsCheckPlayerShopLantern = {
  id: "01a17ffe-7d82-7ad5-a30f-bb80b1c393fd",
  type: "page-type/story-item",
  slug: "outcome-cards-check-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/outcome-cards-check-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/outcome-cards-check",
  character: "character-player/outcome-cards-check-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies StoryItem
