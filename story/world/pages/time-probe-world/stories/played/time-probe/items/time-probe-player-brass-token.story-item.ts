import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const timeProbePlayerBrassToken = {
  id: "01a1802d-b13e-74f9-b7e1-cd56ae318fd1",
  type: "page-type/story-item",
  slug: "time-probe-player-brass-token",
  title: "Brass Token",
  world: "world/time-probe-world",
  story: "story-played/time-probe",
  character: "character-player/time-probe-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies StoryItem
