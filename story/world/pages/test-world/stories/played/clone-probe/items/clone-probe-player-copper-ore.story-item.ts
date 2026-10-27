import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerCopperOre = {
  id: "01a17f3e-4458-7543-9ef5-007f33de2aa1",
  type: "page-type/story-item",
  slug: "clone-probe-player-copper-ore",
  title: "Copper Ore",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  quantity: 5,
  category: "material",
  description: "A lump of green-streaked rock holding copper.",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies StoryItem
