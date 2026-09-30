import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaAppleCake = {
  id: "01a0f3ac-54f8-7301-aa4b-c9324b45d66f",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-apple-cake",
  title: "Apple Cake",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  quantity: 1,
  description: "A slab of Hobb's apple cake wrapped in a cloth.",
} as const satisfies StoryItem
