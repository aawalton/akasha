import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIVossHead = {
  id: "01a0fe5d-f836-770f-b7c7-26a2585df372",
  type: "page-type/story-item",
  slug: "overwhere-i-voss-head",
  title: "Harl Voss's Head",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description: "The unsalted head of Harl Voss, the deserter captain, carried in his own sack.",
} as const satisfies StoryItem
