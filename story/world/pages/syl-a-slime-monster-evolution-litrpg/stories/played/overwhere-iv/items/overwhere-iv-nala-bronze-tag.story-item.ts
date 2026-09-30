import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaBronzeTag = {
  id: "01a0f1be-a73a-7254-9ac3-e6cc610c3bbb",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-bronze-tag",
  title: "Bronze Tag",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  description: "A small punched bronze guild tag on a leather cord, marking her a hall member.",
} as const satisfies StoryItem
