import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pendingRollTrialPlayerBrassToken = {
  id: "01a183cf-b828-7fc7-b7db-707493d4bde7",
  type: "page-type/story-item",
  slug: "pending-roll-trial-player-brass-token",
  title: "Brass Token",
  world: "world/pending-roll-trial-world",
  story: "story-played/pending-roll-trial",
  character: "character-player/pending-roll-trial-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies StoryItem
