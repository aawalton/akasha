import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerEmberChamberStairSlab = {
  id: "01a0d442-ca75-749b-bf6c-f4f41b3fa3e5",
  type: "page-type/story-item",
  slug: "the-tower-ember-chamber-stair-slab",
  title: "The stair-slab",
  story: "story-played/the-tower",
  place: "place/the-tower-ember-chamber",
  description: "A seamless stone slab at the head of the far-wall stair, slid open.",
} as const satisfies StoryItem
