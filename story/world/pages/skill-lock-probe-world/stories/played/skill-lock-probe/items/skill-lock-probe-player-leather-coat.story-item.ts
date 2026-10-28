import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerLeatherCoat = {
  id: "01a17ff8-9a7f-77c0-900b-c66c55f6ed22",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-leather-coat",
  title: "Leather Coat",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies StoryItem
