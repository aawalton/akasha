import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const timeProbePlayerLantern = {
  id: "01a1802d-b13e-70b1-b99d-fb9a7ec1022b",
  type: "page-type/story-item",
  slug: "time-probe-player-lantern",
  title: "Lantern",
  world: "world/time-probe-world",
  story: "story-played/time-probe",
  character: "character-player/time-probe-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies StoryItem
