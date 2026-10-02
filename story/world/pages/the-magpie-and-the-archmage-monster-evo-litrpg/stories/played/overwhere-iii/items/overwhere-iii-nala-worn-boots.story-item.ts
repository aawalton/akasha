import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaWornBoots = {
  id: "01a0fdd3-9f5d-7480-bf45-b90f18d859fd",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-worn-boots",
  title: "Worn Boots",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  description: "A pair of old leather boots, scuffed and resoled, soft from long wear.",
} as const satisfies StoryItem
