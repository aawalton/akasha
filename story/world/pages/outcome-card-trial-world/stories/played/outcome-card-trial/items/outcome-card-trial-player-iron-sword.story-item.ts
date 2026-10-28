import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardTrialPlayerIronSword = {
  id: "01a183ae-dc71-7d28-9d52-4d5e8a657d59",
  type: "page-type/story-item",
  slug: "outcome-card-trial-player-iron-sword",
  title: "Iron Sword",
  world: "world/outcome-card-trial-world",
  story: "story-played/outcome-card-trial",
  character: "character-player/outcome-card-trial-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies StoryItem
