import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerThresholdStone = {
  id: "01a0d445-0c36-7aaa-88cf-3a5603c00a46",
  type: "page-type/item",
  slug: "the-tower-threshold-stone",
  title: "The threshold-stone",
  story: "story-played/the-tower",
  place: "place/the-tower-haven-threshold",
  description: "The dusty stone floor at the haven's mouth.",
} as const satisfies Item
