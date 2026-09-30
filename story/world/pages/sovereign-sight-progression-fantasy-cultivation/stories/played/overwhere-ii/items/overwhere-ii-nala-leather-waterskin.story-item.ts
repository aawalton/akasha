import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaLeatherWaterskin = {
  id: "01a0f46d-83f8-7e12-9752-8f0e4d0632fb",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-leather-waterskin",
  title: "Leather Waterskin",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A stitched leather waterskin with a wooden stopper and a carrying cord.",
} as const satisfies StoryItem
