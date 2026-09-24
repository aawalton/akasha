import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerWallSpike = {
  id: "01a0d444-39e3-7003-8d58-b273a8b5b14e",
  type: "page-type/item",
  slug: "the-tower-wall-spike",
  title: "Wall-spike",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-base-flights",
  description: "A long iron spike set loose in the wall along the lowest flight.",
} as const satisfies Item
