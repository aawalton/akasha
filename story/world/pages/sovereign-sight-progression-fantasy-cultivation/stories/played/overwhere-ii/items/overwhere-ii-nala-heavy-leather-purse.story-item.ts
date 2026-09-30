import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaHeavyLeatherPurse = {
  id: "01a0f3dc-16e3-7c60-a1d3-24b9246c161c",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-heavy-leather-purse",
  title: "Heavy Leather Purse",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A heavy leather purse, tied at the neck, that clinks when it moves.",
} as const satisfies StoryItem
