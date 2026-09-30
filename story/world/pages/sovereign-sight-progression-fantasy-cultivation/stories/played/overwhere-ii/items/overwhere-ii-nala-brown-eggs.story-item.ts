import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaBrownEggs = {
  id: "01a0f21c-c14d-71f8-88a0-041a57ac0cd3",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-brown-eggs",
  title: "Brown Eggs",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "Fresh brown hen's eggs, carried in a basket.",
  quantity: 6,
} as const satisfies StoryItem
