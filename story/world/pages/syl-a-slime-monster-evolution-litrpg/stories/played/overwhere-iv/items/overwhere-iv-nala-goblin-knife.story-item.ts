import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaGoblinKnife = {
  id: "01a0fd71-8452-7ac1-bdb9-0c34f729cd7e",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-goblin-knife",
  title: "Goblin Knife",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  description: "A short iron knife, rusty and notched along the edge.",
} as const satisfies StoryItem
