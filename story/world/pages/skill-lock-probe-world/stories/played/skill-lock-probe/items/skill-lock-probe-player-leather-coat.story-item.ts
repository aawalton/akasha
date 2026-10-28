import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerLeatherCoat = {
  id: "01a17ff2-6f78-7401-8bde-0e9cd087a90d",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-leather-coat",
  title: "Leather Coat",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies StoryItem
