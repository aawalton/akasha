import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereINalaShortSword = {
  id: "01a0fde7-168d-7214-889c-1001b23371b0",
  type: "page-type/story-item",
  slug: "overwhere-i-nala-short-sword",
  title: "Short Sword",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  slot: "item-slot/off-hand",
  description: "A plain soldier's short sword, worn at the grip, taken from a dead crossbowman.",
} as const satisfies StoryItem
