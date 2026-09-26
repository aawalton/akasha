import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const partnersCrossingCoin = {
  id: "01a0de52-0bd5-72cc-a423-28a5afaf8edd",
  type: "page-type/story-item",
  slug: "partners-crossing-coin",
  title: "Crossing coin",
  story: "story-played/partners",
  character: "character-player/partners-alan",
  description: "A heavy coin, warm to the touch, stamped with writing that will not resolve.",
} as const satisfies StoryItem
