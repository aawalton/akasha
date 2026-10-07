import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherBeeTin = {
  id: "01a11410-b971-76a7-9512-bba8fbdf91d5",
  type: "page-type/story-item",
  slug: "fairweather-bee-tin",
  title: "Bee Tin",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A round cake tin with a fitted lid, painted with bees.",
} as const satisfies StoryItem
