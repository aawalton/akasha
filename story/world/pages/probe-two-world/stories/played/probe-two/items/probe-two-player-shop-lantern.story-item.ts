import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const probeTwoPlayerShopLantern = {
  id: "01a17fbf-aff5-7755-9783-d1f6e85992bb",
  type: "page-type/story-item",
  slug: "probe-two-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/probe-two-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/probe-two",
  character: "character-player/probe-two-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies StoryItem
