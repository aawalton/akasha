import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const timeProbePlayerCopperOre = {
  id: "01a1802d-b13e-7c97-a777-2cc8b1f9fce9",
  type: "page-type/story-item",
  slug: "time-probe-player-copper-ore",
  title: "Copper Ore",
  world: "world/time-probe-world",
  story: "story-played/time-probe",
  character: "character-player/time-probe-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies StoryItem
