import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherBrassGoggles = {
  id: "01a10365-f8f2-7d93-ad66-850ab17e3233",
  type: "page-type/story-item",
  slug: "fairweather-brass-goggles",
  title: "Brass Goggles",
  story: "story-written/fairweather",
  character: "character-other/fairweather-tilly",
  description: "A pair of brass goggles, worn pushed up on the head.",
} as const satisfies StoryItem
