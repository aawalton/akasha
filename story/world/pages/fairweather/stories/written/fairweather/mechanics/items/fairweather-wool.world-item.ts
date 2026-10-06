import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherWool = {
  id: "01a11186-d829-75e6-b2e7-51a800655f2b",
  type: "page-type/world-item",
  slug: "fairweather-wool",
  title: "Wool",
  world: "world/fairweather",
  description: "Soft spun sheep's wool wound in a skein, dyed any colour, for knitting.",
} as const satisfies WorldItem
