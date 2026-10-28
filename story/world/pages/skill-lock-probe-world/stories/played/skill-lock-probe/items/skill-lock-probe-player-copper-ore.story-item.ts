import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerCopperOre = {
  id: "01a17ff8-9a7f-7f0e-959d-467b3778edce",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-copper-ore",
  title: "Copper Ore",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies StoryItem
