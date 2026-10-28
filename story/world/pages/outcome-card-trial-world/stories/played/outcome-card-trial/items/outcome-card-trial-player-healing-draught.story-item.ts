import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardTrialPlayerHealingDraught = {
  id: "01a183ae-dc71-752f-aab6-f390e09d0ee2",
  type: "page-type/story-item",
  slug: "outcome-card-trial-player-healing-draught",
  title: "Healing Draught",
  world: "world/outcome-card-trial-world",
  story: "story-played/outcome-card-trial",
  character: "character-player/outcome-card-trial-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies StoryItem
