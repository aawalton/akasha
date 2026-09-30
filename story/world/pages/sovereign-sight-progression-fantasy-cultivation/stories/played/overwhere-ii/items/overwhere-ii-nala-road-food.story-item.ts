import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaRoadFood = {
  id: "01a0f46d-99d4-78f1-aa75-4f3e30b90cc4",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-road-food",
  title: "Road Food",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A cloth bundle holding the last of a day's cheese.",
} as const satisfies StoryItem
