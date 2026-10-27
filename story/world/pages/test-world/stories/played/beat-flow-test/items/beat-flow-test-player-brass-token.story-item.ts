import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const beatFlowTestPlayerBrassToken = {
  id: "01a17f7f-6e81-7d04-bbfc-ad465f68e978",
  type: "page-type/story-item",
  slug: "beat-flow-test-player-brass-token",
  title: "Brass Token",
  world: "world/test-world",
  story: "story-played/beat-flow-test",
  character: "character-player/beat-flow-test-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies StoryItem
