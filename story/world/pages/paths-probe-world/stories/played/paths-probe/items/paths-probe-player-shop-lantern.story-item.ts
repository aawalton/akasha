import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsProbePlayerShopLantern = {
  id: "01a18008-7533-7d83-a66e-4a524a1dd7f6",
  type: "page-type/story-item",
  slug: "paths-probe-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/paths-probe-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/paths-probe",
  character: "character-player/paths-probe-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies StoryItem
