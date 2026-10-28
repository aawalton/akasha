import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const timeProbePlayerShopLantern = {
  id: "01a1802d-b13e-729b-9c0a-ddf25b8cce48",
  type: "page-type/story-item",
  slug: "time-probe-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/time-probe-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/time-probe",
  character: "character-player/time-probe-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies StoryItem
