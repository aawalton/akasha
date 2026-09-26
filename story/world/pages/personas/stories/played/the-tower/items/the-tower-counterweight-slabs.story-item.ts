import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerCounterweightSlabs = {
  id: "01a0d444-2292-7b73-aef8-9cf767201555",
  type: "page-type/story-item",
  slug: "the-tower-counterweight-slabs",
  title: "Counterweight slabs",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-base-flights",
  description: "Flat stone counterweight platforms hanging in the shaft, now still.",
} as const satisfies StoryItem
