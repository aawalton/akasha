import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaBrassRing = {
  id: "01a0fd71-8451-7c8c-ba92-402e0de05866",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-brass-ring",
  title: "Brass Ring",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  description: "A woman's plain brass ring.",
} as const satisfies StoryItem
