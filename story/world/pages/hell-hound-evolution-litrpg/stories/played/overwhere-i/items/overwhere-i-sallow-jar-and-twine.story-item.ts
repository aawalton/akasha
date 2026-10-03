import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereISallowJarAndTwine = {
  id: "01a1016c-1d47-7fee-bd86-31b67af8fd0d",
  type: "page-type/story-item",
  slug: "overwhere-i-sallow-jar-and-twine",
  title: "Mother Sallow's Jar and Twine",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "A stoppered clay jar and a hank of waxed twine, lent by Mother Sallow for a bile sac.",
} as const satisfies StoryItem
