import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherFlowerClip = {
  id: "01a102af-305c-72fb-9527-0fe81ec17a4f",
  type: "page-type/story-item",
  slug: "fairweather-flower-clip",
  title: "Flower Clip",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A small hair clip shaped like a pink-and-white flower.",
} as const satisfies StoryItem
