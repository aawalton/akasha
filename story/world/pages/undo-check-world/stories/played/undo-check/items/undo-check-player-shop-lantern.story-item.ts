import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const undoCheckPlayerShopLantern = {
  id: "01a18309-e114-7ead-b71e-67196e3c57f6",
  type: "page-type/story-item",
  slug: "undo-check-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/undo-check-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/undo-check",
  character: "character-player/undo-check-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies StoryItem
