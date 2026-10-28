import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardsCheckPlayerHealingDraught = {
  id: "01a17ffe-7d82-7ec2-88f3-19666246253a",
  type: "page-type/story-item",
  slug: "outcome-cards-check-player-healing-draught",
  title: "Healing Draught",
  world: "world/outcome-cards-check-world",
  story: "story-played/outcome-cards-check",
  character: "character-player/outcome-cards-check-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies StoryItem
