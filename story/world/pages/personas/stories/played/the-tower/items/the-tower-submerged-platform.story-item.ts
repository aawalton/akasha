import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerSubmergedPlatform = {
  id: "01a0d443-10a3-72c9-9f26-4cdd9d2a75fc",
  type: "page-type/story-item",
  slug: "the-tower-submerged-platform",
  title: "The submerged platform",
  story: "story-played/the-tower",
  place: "place/the-tower-cistern-deep",
  description: "A stone shelf under knee-to-waist-deep water, with deep water on three sides.",
} as const satisfies StoryItem
