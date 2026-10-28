import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsSheetCheckPlayerShopLantern = {
  id: "01a182db-5bf2-733b-93b6-b733e606b770",
  type: "page-type/story-item",
  slug: "paths-sheet-check-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/paths-sheet-check-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/paths-sheet-check",
  character: "character-player/paths-sheet-check-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies StoryItem
