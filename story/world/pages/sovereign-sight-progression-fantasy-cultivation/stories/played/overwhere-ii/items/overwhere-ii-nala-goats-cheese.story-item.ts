import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaGoatsCheese = {
  id: "01a0f43f-faca-77bc-b97f-b68d830cd2d3",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-goats-cheese",
  title: "Goat's Cheese",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A small round of white goat's cheese wrapped in a cloth.",
} as const satisfies StoryItem
