import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherLeatherJerkin = {
  id: "01a10365-f8f3-7a24-acc5-c9d6eee37e4b",
  type: "page-type/story-item",
  slug: "fairweather-leather-jerkin",
  title: "Leather Jerkin",
  story: "story-written/fairweather",
  character: "character-other/fairweather-tamsin",
  description: "A battered sleeveless leather jerkin.",
} as const satisfies StoryItem
