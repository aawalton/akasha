import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherLampOil = {
  id: "01a103fb-6f65-7cdf-8cb3-60a61a3c5db4",
  type: "page-type/story-item",
  slug: "fairweather-lamp-oil",
  title: "Flask of Lamp Oil",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A stoppered flask of lamp oil bought at a chandler's stall, for the tin lantern.",
} as const satisfies StoryItem
