import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const partnersIiCrossingCoin = {
  id: "01a0de4f-ea3b-7108-a000-5baa9dea2ffa",
  type: "page-type/story-item",
  slug: "partners-ii-crossing-coin",
  title: "Crossing coin",
  story: "story-played/partners-ii",
  character: "character-player/partners-ii-alan",
  description: "A heavy coin, warm to the touch, stamped with writing that will not resolve.",
} as const satisfies StoryItem
