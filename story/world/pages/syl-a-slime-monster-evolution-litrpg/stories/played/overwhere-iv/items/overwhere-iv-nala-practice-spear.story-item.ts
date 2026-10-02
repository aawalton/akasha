import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaPracticeSpear = {
  id: "01a0f1bc-56c8-793f-874a-b512c00e58e3",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-practice-spear",
  title: "Practice Spear",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  description: "A worn ash spear shaft, split off a hand below where its head was.",
} as const satisfies StoryItem
