import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereINalaBrutePelt = {
  id: "01a0f1b8-85c9-78a0-9b02-b1a7f95680a9",
  type: "page-type/story-item",
  slug: "overwhere-i-nala-brute-pelt",
  title: "Brute Pelt",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "The raw black hide of a Blackbriar Brute, rolled fur-in, with a burned hole at the chest.",
} as const satisfies StoryItem
