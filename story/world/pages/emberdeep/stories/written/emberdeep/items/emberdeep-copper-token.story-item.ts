import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const emberdeepCopperToken = {
  id: "01a0fde6-9f89-7e15-ae80-1da63153e8f6",
  type: "page-type/story-item",
  slug: "emberdeep-copper-token",
  title: "Copper Token",
  story: "story-written/emberdeep",
  character: "character-player/emberdeep-nala",
  description:
    "A Delvers' Guild copper rank token stamped NALA MARSH, on a leather cord worn round the neck.",
} as const satisfies StoryItem
