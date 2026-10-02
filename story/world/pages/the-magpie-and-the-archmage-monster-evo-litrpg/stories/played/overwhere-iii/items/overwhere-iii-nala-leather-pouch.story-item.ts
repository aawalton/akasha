import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaLeatherPouch = {
  id: "01a0fe2e-6f7a-7b39-9df0-97741631a0d0",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-leather-pouch",
  title: "Leather Pouch",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  description: "A small old leather pouch with a drawstring, cracked at the seams.",
} as const satisfies StoryItem
