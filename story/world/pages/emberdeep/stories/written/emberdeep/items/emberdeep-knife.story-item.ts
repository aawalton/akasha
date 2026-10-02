import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const emberdeepKnife = {
  id: "01a0fde6-9f89-7b42-9dce-7dae4f4fe927",
  type: "page-type/story-item",
  slug: "emberdeep-knife",
  title: "Knife",
  story: "story-written/emberdeep",
  character: "character-player/emberdeep-nala",
  description: "A plain knife in a worn leather sheath.",
} as const satisfies StoryItem
