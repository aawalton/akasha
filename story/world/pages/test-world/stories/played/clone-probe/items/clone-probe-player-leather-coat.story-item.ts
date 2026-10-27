import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerLeatherCoat = {
  id: "01a17f4c-d936-7eb0-9b64-d5b14f381477",
  type: "page-type/story-item",
  slug: "clone-probe-player-leather-coat",
  title: "Leather Coat",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies StoryItem
