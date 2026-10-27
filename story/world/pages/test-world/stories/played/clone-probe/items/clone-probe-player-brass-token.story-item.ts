import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerBrassToken = {
  id: "01a17f4c-d936-78fe-b21b-8e1be2a59800",
  type: "page-type/story-item",
  slug: "clone-probe-player-brass-token",
  title: "Brass Token",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies StoryItem
