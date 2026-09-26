import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerSilverWhistle = {
  id: "01a0d443-7ca4-7f2b-8eba-f896760dcba1",
  type: "page-type/story-item",
  slug: "the-tower-silver-whistle",
  title: "Silver whistle",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-alcove",
  description: "A silver whistle that sounds a single piercing note.",
} as const satisfies StoryItem
