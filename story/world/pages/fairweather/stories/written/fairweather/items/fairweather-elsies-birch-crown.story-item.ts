import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherElsiesBirchCrown = {
  id: "01a11365-72cb-7daa-ba2d-9c7e37383795",
  type: "page-type/story-item",
  slug: "fairweather-elsies-birch-crown",
  title: "Birch Crown",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A ring of green birch leaves tied with ribbons, worn on the head.",
} as const satisfies StoryItem
