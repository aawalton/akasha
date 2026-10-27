import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerShopLantern = {
  id: "01a17f3e-4458-79ae-80de-49ba82a32edf",
  type: "page-type/story-item",
  slug: "clone-probe-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/test-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies StoryItem
