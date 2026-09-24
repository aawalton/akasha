import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerBrokenStairflights = {
  id: "01a0d444-1aca-79d4-a272-7e9d43d82ce7",
  type: "page-type/item",
  slug: "the-tower-broken-stairflights",
  title: "The broken stairflights",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-base-flights",
  description:
    "Stone stairflights bolted to the shaft wall, solid where they hold, with gaps between.",
} as const satisfies Item
