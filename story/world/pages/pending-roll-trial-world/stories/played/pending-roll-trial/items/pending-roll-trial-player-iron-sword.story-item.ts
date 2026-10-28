import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pendingRollTrialPlayerIronSword = {
  id: "01a183cf-b828-7c3f-9666-0a147ec6740a",
  type: "page-type/story-item",
  slug: "pending-roll-trial-player-iron-sword",
  title: "Iron Sword",
  world: "world/pending-roll-trial-world",
  story: "story-played/pending-roll-trial",
  character: "character-player/pending-roll-trial-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies StoryItem
