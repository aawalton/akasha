import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const emberdeepRope = {
  id: "01a0fde6-9f8a-7504-92a5-76fa88d762f8",
  type: "page-type/story-item",
  slug: "emberdeep-rope",
  title: "Rope",
  story: "story-written/emberdeep",
  character: "character-player/emberdeep-nala",
  description: "A coil of stiff new rope.",
} as const satisfies StoryItem
