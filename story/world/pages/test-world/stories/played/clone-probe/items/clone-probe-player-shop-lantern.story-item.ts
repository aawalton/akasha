import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerShopLantern = {
  id: "01a17f4c-d936-796c-a198-365f347c4297",
  type: "page-type/story-item",
  slug: "clone-probe-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/test-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies StoryItem
