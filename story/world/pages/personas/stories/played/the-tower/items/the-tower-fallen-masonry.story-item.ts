import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerFallenMasonry = {
  id: "01a0d442-c289-7e4f-96b8-18ffbe877e19",
  type: "page-type/story-item",
  slug: "the-tower-fallen-masonry",
  title: "Fallen masonry chunks",
  story: "story-played/the-tower",
  place: "place/the-tower-ember-chamber",
  description: "Chunks of fallen masonry along the walls, some of them fist-sized.",
} as const satisfies StoryItem
