import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsProbePlayerLantern = {
  id: "01a18008-7533-788b-bb1d-22dcf815602f",
  type: "page-type/story-item",
  slug: "paths-probe-player-lantern",
  title: "Lantern",
  world: "world/paths-probe-world",
  story: "story-played/paths-probe",
  character: "character-player/paths-probe-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies StoryItem
