import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerAlcoveScratchedWords = {
  id: "01a0d443-8cd5-7aa8-817f-5f2a587444da",
  type: "page-type/story-item",
  slug: "the-tower-alcove-scratched-words",
  title: "Scratched words on the alcove wall",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-alcove",
  description: "Words scratched into the wall above the robed corpse.",
} as const satisfies StoryItem
