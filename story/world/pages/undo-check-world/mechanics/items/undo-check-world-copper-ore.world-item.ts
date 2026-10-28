import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const undoCheckWorldCopperOre = {
  id: "01a18309-e114-70a5-bc39-eeea78fd4201",
  type: "page-type/world-item",
  slug: "undo-check-world-copper-ore",
  title: "Copper Ore",
  world: "world/undo-check-world",
  description: "A lump of green-streaked rock holding copper.",
  category: "material",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies WorldItem
