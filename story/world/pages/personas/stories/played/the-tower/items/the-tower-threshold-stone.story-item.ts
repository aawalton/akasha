import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerThresholdStone = {
  id: "01a0d445-0c36-7aaa-88cf-3a5603c00a46",
  type: "page-type/story-item",
  slug: "the-tower-threshold-stone",
  title: "The threshold-stone",
  story: "story-played/the-tower",
  place: "place/the-tower-haven-threshold",
  description: "The dusty stone floor at the haven's mouth.",
  createdAt: "2026-09-24T16:34:50.038Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies StoryItem
