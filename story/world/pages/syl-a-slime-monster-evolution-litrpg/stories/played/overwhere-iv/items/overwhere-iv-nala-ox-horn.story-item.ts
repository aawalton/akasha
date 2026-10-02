import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaOxHorn = {
  id: "01a0fd71-8452-734f-8195-b553e0075c7a",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-ox-horn",
  title: "Cracked Ox Horn",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  description: "A cracked ox horn hollowed for blowing, on a greasy cord.",
} as const satisfies StoryItem
