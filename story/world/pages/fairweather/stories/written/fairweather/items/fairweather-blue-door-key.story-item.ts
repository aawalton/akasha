import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherBlueDoorKey = {
  id: "01a11410-b972-7c2c-a41f-b564eeecbb59",
  type: "page-type/story-item",
  slug: "fairweather-blue-door-key",
  title: "Blue-Door Key",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A long iron key to the blue-door house, with a blue paper tag tied to its bow.",
} as const satisfies StoryItem
