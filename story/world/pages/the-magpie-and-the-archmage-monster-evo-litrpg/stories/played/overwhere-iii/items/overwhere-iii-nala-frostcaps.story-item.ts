import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaFrostcaps = {
  id: "01a0f24e-34d1-703c-9000-56ae3c3e913d",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-frostcaps",
  title: "Frostcaps",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  quantity: 15,
  description: "Good frostcaps from the afternoon shade, cut clean at the root.",
} as const satisfies StoryItem
