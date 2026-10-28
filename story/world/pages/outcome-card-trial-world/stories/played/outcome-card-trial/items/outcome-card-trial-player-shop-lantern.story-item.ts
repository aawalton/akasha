import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardTrialPlayerShopLantern = {
  id: "01a183ae-dc71-7fbc-aa7e-418b6bc4c286",
  type: "page-type/story-item",
  slug: "outcome-card-trial-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/outcome-card-trial-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/outcome-card-trial",
  character: "character-player/outcome-card-trial-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies StoryItem
