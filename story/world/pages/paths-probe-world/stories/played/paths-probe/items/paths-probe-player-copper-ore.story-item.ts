import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsProbePlayerCopperOre = {
  id: "01a18008-7533-7fe0-a7b9-f8c326744da5",
  type: "page-type/story-item",
  slug: "paths-probe-player-copper-ore",
  title: "Copper Ore",
  world: "world/paths-probe-world",
  story: "story-played/paths-probe",
  character: "character-player/paths-probe-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies StoryItem
