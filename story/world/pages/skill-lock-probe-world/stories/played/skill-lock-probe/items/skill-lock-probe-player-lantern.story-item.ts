import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerLantern = {
  id: "01a17ff2-6f78-75e8-acb3-ec7c65be6b69",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-lantern",
  title: "Lantern",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies StoryItem
