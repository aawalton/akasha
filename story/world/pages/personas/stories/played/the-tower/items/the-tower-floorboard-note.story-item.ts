import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerFloorboardNote = {
  id: "01a0d445-22e1-7352-981f-79089a4c6649",
  type: "page-type/story-item",
  slug: "the-tower-floorboard-note",
  title: "The floorboard note",
  story: "story-played/the-tower",
  place: "place/the-tower-hall-of-welcome",
  description: "A note scratched into a floorboard behind the couches.",
} as const satisfies StoryItem
