import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerShopLantern = {
  id: "01a17ff8-9a7f-7104-b1f4-df334e882fe5",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-shop-lantern",
  description: "A tin lantern with a glass window and a wire handle, bought filled with oil.",
  world: "world/skill-lock-probe-world",
  category: "tool",
  title: "Lantern",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  slot: "item-slot/off-hand",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies StoryItem
