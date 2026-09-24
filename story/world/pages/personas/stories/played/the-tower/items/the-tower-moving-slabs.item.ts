import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerMovingSlabs = {
  id: "01a0d444-525e-7e04-b30f-bff1db0e68f2",
  type: "page-type/item",
  slug: "the-tower-moving-slabs",
  title: "The mid-shaft slabs",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-mid-slabs",
  description:
    "A sequence of stone slabs in the middle of the shaft, the only footing there, now still.",
} as const satisfies Item
