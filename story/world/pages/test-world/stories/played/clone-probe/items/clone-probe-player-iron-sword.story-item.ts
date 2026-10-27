import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerIronSword = {
  id: "01a17f3e-4458-7964-9444-151c8a6de9d2",
  type: "page-type/story-item",
  slug: "clone-probe-player-iron-sword",
  title: "Iron Sword",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  slot: "item-slot/main-hand",
  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies StoryItem
