import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pendingRollTrialPlayerCopperOre = {
  id: "01a183cf-b828-70ba-9398-2192ce3ad306",
  type: "page-type/story-item",
  slug: "pending-roll-trial-player-copper-ore",
  title: "Copper Ore",
  world: "world/pending-roll-trial-world",
  story: "story-played/pending-roll-trial",
  character: "character-player/pending-roll-trial-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies StoryItem
