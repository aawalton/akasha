import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const coffeeShopDate = {
  id: "01a0682a-3e1b-7ac4-be68-6d4f2586b70c",
  type: "page-type/story-played",
  slug: "coffee-shop-date",
  title: "Coffee Shop Date",
  world: "world/personas",
  unit: "unit/words",
} as const satisfies StoryPlayed
