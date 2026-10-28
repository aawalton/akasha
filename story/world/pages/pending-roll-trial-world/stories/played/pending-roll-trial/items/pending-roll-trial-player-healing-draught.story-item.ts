import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pendingRollTrialPlayerHealingDraught = {
  id: "01a183cf-b828-703a-b766-df1b4ff1d976",
  type: "page-type/story-item",
  slug: "pending-roll-trial-player-healing-draught",
  title: "Healing Draught",
  world: "world/pending-roll-trial-world",
  story: "story-played/pending-roll-trial",
  character: "character-player/pending-roll-trial-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies StoryItem
