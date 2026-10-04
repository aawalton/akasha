import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherPearFizz = {
  id: "01a10631-6bc7-78fd-a586-1fb8877303cf",
  type: "page-type/world-item",
  slug: "fairweather-pear-fizz",
  title: "Pear Fizz",
  world: "world/fairweather",
  description:
    "A small corked bottle of sparkling brew tasting of pears, drunk to wake a person up.",
} as const satisfies WorldItem
