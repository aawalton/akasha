import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const memoCheckPlayerShopLantern = {
  id: "01a1832d-38c0-7808-b2da-a4f48132a82c",
  type: "page-type/story-item",
  slug: "memo-check-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/memo-check-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/memo-check",
  character: "character-player/memo-check-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies StoryItem
