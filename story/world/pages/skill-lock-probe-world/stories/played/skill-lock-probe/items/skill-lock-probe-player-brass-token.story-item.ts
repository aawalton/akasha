import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerBrassToken = {
  id: "01a17ff8-9a7f-714d-afe7-71aaefd9f030",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-brass-token",
  title: "Brass Token",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies StoryItem
