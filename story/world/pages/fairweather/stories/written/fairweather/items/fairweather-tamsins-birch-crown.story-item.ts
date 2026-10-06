import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherTamsinsBirchCrown = {
  id: "01a11365-72cb-7228-b3c2-b59c04bfc5db",
  type: "page-type/story-item",
  slug: "fairweather-tamsins-birch-crown",
  title: "Birch Crown",
  story: "story-written/fairweather",
  character: "character-other/fairweather-tamsin",
  description: "A ring of green birch leaves tied with ribbons, worn on the head.",
} as const satisfies StoryItem
