import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereINalaBrackBoots = {
  id: "01a0f3e8-ff49-7836-8148-f90b9d27a883",
  type: "page-type/story-item",
  slug: "overwhere-i-nala-brack-boots",
  title: "Leather Boots",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  slot: "item-slot/feet",
  description: "Calf-high boots of tanned leather, stitched to her own feet by Fenwatch's tanner.",
} as const satisfies StoryItem
