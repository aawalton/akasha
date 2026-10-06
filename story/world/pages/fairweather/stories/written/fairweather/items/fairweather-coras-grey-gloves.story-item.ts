import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherCorasGreyGloves = {
  id: "01a11365-72cb-7f44-81fd-5b5f3fe80599",
  type: "page-type/story-item",
  slug: "fairweather-coras-grey-gloves",
  title: "Grey Gloves",
  story: "story-written/fairweather",
  character: "character-other/fairweather-cora",
  description: "A pair of hand-knitted gloves of soft pale grey wool, long in the fingers.",
} as const satisfies StoryItem
