import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerGreyLitExitStair = {
  id: "01a0d444-730d-7033-8476-310bb753c808",
  type: "page-type/story-item",
  slug: "the-tower-grey-lit-exit-stair",
  title: "The grey-lit exit-stair",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-headworks",
  description: "A stair beyond the gantry, climbing up into grey light.",
} as const satisfies StoryItem
