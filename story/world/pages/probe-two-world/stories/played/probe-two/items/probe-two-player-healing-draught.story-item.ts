import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const probeTwoPlayerHealingDraught = {
  id: "01a17fbf-aff5-7dca-9da3-329df81a4699",
  type: "page-type/story-item",
  slug: "probe-two-player-healing-draught",
  title: "Healing Draught",
  world: "world/probe-two-world",
  story: "story-played/probe-two",
  character: "character-player/probe-two-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies StoryItem
