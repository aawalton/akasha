import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const probeTwoWorldCopperOre = {
  id: "01a17fbf-aff5-715a-9de8-6481ab5a14a7",
  type: "page-type/world-item",
  slug: "probe-two-world-copper-ore",
  title: "Copper Ore",
  world: "world/probe-two-world",
  description: "A lump of green-streaked rock holding copper.",
  category: "material",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies WorldItem
