import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerBrassToken = {
  id: "01a17f3e-4458-71f6-846b-1be331fd09f9",
  type: "page-type/story-item",
  slug: "clone-probe-player-brass-token",
  title: "Brass Token",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies StoryItem
