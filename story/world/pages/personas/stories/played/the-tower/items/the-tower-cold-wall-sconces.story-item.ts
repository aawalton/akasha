import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerColdWallSconces = {
  id: "01a0d443-64ce-793d-b74b-bec750c2d3b6",
  type: "page-type/story-item",
  slug: "the-tower-cold-wall-sconces",
  title: "Cold wall sconces",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-nave",
  description: "Long-dead wall sconces with no oil and no flame.",
} as const satisfies StoryItem
