import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherWaterFlask = {
  id: "01a10305-5084-74ec-92a1-5c5c7f604caf",
  type: "page-type/story-item",
  slug: "fairweather-water-flask",
  title: "Water Flask",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A leather-covered tin flask of water with a cork stopper, hung on a strap.",
} as const satisfies StoryItem
