import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerCopperOre = {
  id: "01a17ff2-6f78-7ae7-a35c-152832326b7d",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-copper-ore",
  title: "Copper Ore",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies StoryItem
