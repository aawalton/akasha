import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const emberdeepCanvasPack = {
  id: "01a0fde6-9f89-7da3-8756-1eef80defdf2",
  type: "page-type/story-item",
  slug: "emberdeep-canvas-pack",
  title: "Canvas Pack",
  story: "story-written/emberdeep",
  character: "character-player/emberdeep-nala",
  description:
    "A canvas pack with a flap, NALA stitched inside the flap in brown thread, and a pocket sewn under it.",
} as const satisfies StoryItem
