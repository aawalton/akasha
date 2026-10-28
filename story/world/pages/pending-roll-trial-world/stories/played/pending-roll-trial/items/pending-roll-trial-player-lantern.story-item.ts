import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pendingRollTrialPlayerLantern = {
  id: "01a183cf-b828-70a5-aee7-5044203f829f",
  type: "page-type/story-item",
  slug: "pending-roll-trial-player-lantern",
  title: "Lantern",
  world: "world/pending-roll-trial-world",
  story: "story-played/pending-roll-trial",
  character: "character-player/pending-roll-trial-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies StoryItem
