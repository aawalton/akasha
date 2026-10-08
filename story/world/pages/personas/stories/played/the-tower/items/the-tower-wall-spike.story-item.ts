import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerWallSpike = {
  id: "01a0d444-39e3-7003-8d58-b273a8b5b14e",
  type: "page-type/story-item",
  slug: "the-tower-wall-spike",
  title: "Wall-spike",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-base-flights",
  description: "A long iron spike set loose in the wall along the lowest flight.",
  createdAt: "2026-09-24T16:33:56.195Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies StoryItem
