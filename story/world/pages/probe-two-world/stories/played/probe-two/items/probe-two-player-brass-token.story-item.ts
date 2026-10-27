import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const probeTwoPlayerBrassToken = {
  id: "01a17fbf-aff5-7e6a-9bf1-7130e235bee8",
  type: "page-type/story-item",
  slug: "probe-two-player-brass-token",
  title: "Brass Token",
  world: "world/probe-two-world",
  story: "story-played/probe-two",
  character: "character-player/probe-two-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies StoryItem
