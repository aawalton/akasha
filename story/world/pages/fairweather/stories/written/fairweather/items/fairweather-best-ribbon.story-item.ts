import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherBestRibbon = {
  id: "01a10632-d91a-7ab9-9c25-c1853e3e2ee9",
  type: "page-type/story-item",
  slug: "fairweather-best-ribbon",
  title: "Best Ribbon",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A length of rose-pink satin ribbon, kept folded for tying up gifts.",
} as const satisfies StoryItem
