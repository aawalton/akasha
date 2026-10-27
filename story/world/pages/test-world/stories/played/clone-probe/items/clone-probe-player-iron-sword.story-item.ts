import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerIronSword = {
  id: "01a17f4c-d936-7985-8884-b09ef7f3fe7e",
  type: "page-type/story-item",
  slug: "clone-probe-player-iron-sword",
  title: "Iron Sword",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  slot: "item-slot/main-hand",
  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T22:05:47.008Z",
} as const satisfies StoryItem
