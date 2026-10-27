import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const beatFlowTestPlayerShopLantern = {
  id: "01a17f7f-6e81-73f9-bcd3-0357856d2b90",
  type: "page-type/story-item",
  slug: "beat-flow-test-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/test-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/beat-flow-test",
  character: "character-player/beat-flow-test-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies StoryItem
