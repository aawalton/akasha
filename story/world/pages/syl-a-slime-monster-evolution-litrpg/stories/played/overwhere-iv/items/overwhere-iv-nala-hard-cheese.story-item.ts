import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaHardCheese = {
  id: "01a0fd71-8452-7578-abbc-dcbdaf65a0d3",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-hard-cheese",
  title: "Half Wheel of Hard Cheese",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  description: "Half a wheel of pale, hard farm cheese.",
} as const satisfies StoryItem
