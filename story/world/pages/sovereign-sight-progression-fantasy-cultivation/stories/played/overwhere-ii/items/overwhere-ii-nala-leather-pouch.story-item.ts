import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaLeatherPouch = {
  id: "01a0f1fc-23f3-74d7-8fa2-980b4e27348d",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-leather-pouch",
  title: "Leather Pouch",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A small drawstring pouch of soft brown leather, big enough for a handful of coin.",
} as const satisfies StoryItem
