import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const beatFlowTestPlayerLantern = {
  id: "01a17f7f-6e81-7530-91cc-aaacffab3070",
  type: "page-type/story-item",
  slug: "beat-flow-test-player-lantern",
  title: "Lantern",
  world: "world/test-world",
  story: "story-played/beat-flow-test",
  character: "character-player/beat-flow-test-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies StoryItem
