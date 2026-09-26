import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerCorrodedSpiralStair = {
  id: "01a0d443-1899-7ed0-b48a-b494deaf439b",
  type: "page-type/story-item",
  slug: "the-tower-corroded-spiral-stair",
  title: "The corroded spiral stair",
  story: "story-played/the-tower",
  place: "place/the-tower-cistern-deep",
  description: "A corroded spiral stair on the far side of the water, its seal ground open.",
} as const satisfies StoryItem
