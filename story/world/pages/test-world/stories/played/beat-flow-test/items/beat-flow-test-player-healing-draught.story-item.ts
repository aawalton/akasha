import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const beatFlowTestPlayerHealingDraught = {
  id: "01a17f7f-6e81-71e0-b316-7c83b67efbcc",
  type: "page-type/story-item",
  slug: "beat-flow-test-player-healing-draught",
  title: "Healing Draught",
  world: "world/test-world",
  story: "story-played/beat-flow-test",
  character: "character-player/beat-flow-test-player",
  quantity: 1,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:49:53.212Z",
} as const satisfies StoryItem
