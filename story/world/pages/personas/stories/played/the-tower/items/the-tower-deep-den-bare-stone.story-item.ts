import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerDeepDenBareStone = {
  id: "01a0d445-5a7d-71a2-8cec-6be1c1bb2c50",
  type: "page-type/story-item",
  slug: "the-tower-deep-den-bare-stone",
  title: "The bare wet stone",
  story: "story-played/the-tower",
  place: "place/the-tower-the-deep-den",
  description: "Bare wet stone, the real floor of the den under the fraying gold.",
} as const satisfies StoryItem
