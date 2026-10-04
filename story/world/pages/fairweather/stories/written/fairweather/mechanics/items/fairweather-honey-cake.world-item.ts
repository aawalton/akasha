import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherHoneyCake = {
  id: "01a10631-4ba3-7564-9c59-54d1f392e4ad",
  type: "page-type/world-item",
  slug: "fairweather-honey-cake",
  title: "Honey Cake",
  world: "world/fairweather",
  description:
    "A round golden cake made with a whole comb of honey, dense and sticky, best after a night's rest under a cloth.",
} as const satisfies WorldItem
