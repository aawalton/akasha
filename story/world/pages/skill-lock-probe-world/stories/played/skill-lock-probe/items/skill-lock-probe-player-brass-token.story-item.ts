import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerBrassToken = {
  id: "01a17ff2-6f78-7d71-9e0a-bd6ca741117e",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-brass-token",
  title: "Brass Token",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies StoryItem
