import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pendingRollTrialPlayerShopLantern = {
  id: "01a183cf-b828-7211-8f64-e6ab57cc37de",
  type: "page-type/story-item",
  slug: "pending-roll-trial-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/pending-roll-trial-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/pending-roll-trial",
  character: "character-player/pending-roll-trial-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies StoryItem
