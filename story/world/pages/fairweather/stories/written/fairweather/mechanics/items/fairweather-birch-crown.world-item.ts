import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherBirchCrown = {
  id: "01a11365-72cb-7fac-a522-ca4ba0ecb980",
  type: "page-type/world-item",
  slug: "fairweather-birch-crown",
  title: "Birch Crown",
  world: "world/fairweather",
  description: "A ring of green birch leaves tied with ribbons, worn on the head.",
} as const satisfies WorldItem
