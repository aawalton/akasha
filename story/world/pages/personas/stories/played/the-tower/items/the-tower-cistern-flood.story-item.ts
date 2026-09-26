import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerCisternFlood = {
  id: "01a0d442-f8b5-7a6c-977e-56f5eff5d554",
  type: "page-type/story-item",
  slug: "the-tower-cistern-flood",
  title: "The flood",
  story: "story-played/the-tower",
  place: "place/the-tower-cistern-walkway",
  description: "Cold black water filling the undercroft, deep enough to drown in.",
} as const satisfies StoryItem
