import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const timeProbePlayerLeatherCoat = {
  id: "01a1802d-b13e-7169-b94a-02448eebe010",
  type: "page-type/story-item",
  slug: "time-probe-player-leather-coat",
  title: "Leather Coat",
  world: "world/time-probe-world",
  story: "story-played/time-probe",
  character: "character-player/time-probe-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies StoryItem
