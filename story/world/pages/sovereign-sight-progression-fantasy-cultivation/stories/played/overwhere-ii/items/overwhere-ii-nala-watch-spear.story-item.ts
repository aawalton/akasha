import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaWatchSpear = {
  id: "01a0f3bb-1504-726b-905a-c85f45213e66",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-watch-spear",
  title: "Watch Spear",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  slot: "item-slot/main-hand",
  description: "A plain iron-headed spear on an ash shaft, taller than she is.",
} as const satisfies StoryItem
