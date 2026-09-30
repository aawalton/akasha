import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIWoolLeggings = {
  id: "01a0f1c0-467e-7265-bdda-6e263d002d9d",
  type: "page-type/story-item",
  slug: "overwhere-i-wool-leggings",
  title: "Wool Leggings",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description: "Close-fitting leggings of brown homespun wool.",
} as const satisfies StoryItem
