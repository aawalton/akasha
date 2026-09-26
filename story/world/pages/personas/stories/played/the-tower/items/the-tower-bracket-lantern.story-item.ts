import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerBracketLantern = {
  id: "01a0d444-4db2-7adc-8ad6-55257d82b5f8",
  type: "page-type/story-item",
  slug: "the-tower-bracket-lantern",
  title: "Bracket-lantern",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-base-flights",
  description: "An iron lantern on a bracket wedged in the wall at the first landing.",
} as const satisfies StoryItem
