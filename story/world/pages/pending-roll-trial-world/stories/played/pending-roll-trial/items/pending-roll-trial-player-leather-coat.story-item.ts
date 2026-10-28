import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pendingRollTrialPlayerLeatherCoat = {
  id: "01a183cf-b828-7f3c-89a5-42f4a36230da",
  type: "page-type/story-item",
  slug: "pending-roll-trial-player-leather-coat",
  title: "Leather Coat",
  world: "world/pending-roll-trial-world",
  story: "story-played/pending-roll-trial",
  character: "character-player/pending-roll-trial-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies StoryItem
