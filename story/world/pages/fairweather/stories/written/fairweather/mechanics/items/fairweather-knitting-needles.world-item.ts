import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherKnittingNeedles = {
  id: "01a11186-d829-7b73-b668-1af5c5c329e4",
  type: "page-type/world-item",
  slug: "fairweather-knitting-needles",
  title: "Knitting Needles",
  world: "world/fairweather",
  description: "A pair of smooth pointed needles of polished birch, for knitting wool.",
} as const satisfies WorldItem
