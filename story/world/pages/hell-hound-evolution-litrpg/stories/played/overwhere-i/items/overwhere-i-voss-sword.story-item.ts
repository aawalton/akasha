import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIVossSword = {
  id: "01a0fe5d-f837-748b-9f1a-d8d5b43d257b",
  type: "page-type/story-item",
  slug: "overwhere-i-voss-sword",
  title: "Voss's Sword",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description: "A levy sergeant's arming sword, well kept, taken from Harl Voss's body.",
} as const satisfies StoryItem
