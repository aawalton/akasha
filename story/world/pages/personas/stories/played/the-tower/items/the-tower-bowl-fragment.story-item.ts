import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerBowlFragment = {
  id: "01a0d442-aa4b-7ca8-993d-f8f6d09c688c",
  type: "page-type/story-item",
  slug: "the-tower-bowl-fragment",
  title: "Brittle bowl fragment",
  story: "story-played/the-tower",
  place: "place/the-tower-threshold-landing",
  description: "The broken curve of a brittle bowl.",
} as const satisfies StoryItem
