import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsProbePlayerLeatherCoat = {
  id: "01a18008-7533-7ea4-b3bd-eb4a004a98f7",
  type: "page-type/story-item",
  slug: "paths-probe-player-leather-coat",
  title: "Leather Coat",
  world: "world/paths-probe-world",
  story: "story-played/paths-probe",
  character: "character-player/paths-probe-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies StoryItem
