import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerDriftedAsh = {
  id: "01a0d442-b2fe-74a7-9d60-4437eaef172d",
  type: "page-type/story-item",
  slug: "the-tower-drifted-ash",
  title: "Drifted grey ash and grit",
  story: "story-played/the-tower",
  place: "place/the-tower-threshold-landing",
  description: "Drifted grey ash and grit underfoot.",
} as const satisfies StoryItem
