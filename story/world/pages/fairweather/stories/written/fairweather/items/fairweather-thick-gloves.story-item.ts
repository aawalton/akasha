import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherThickGloves = {
  id: "01a103fa-7a72-731e-b862-7dd28607fa66",
  type: "page-type/story-item",
  slug: "fairweather-thick-gloves",
  title: "Thick Gloves",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description:
    "A pair of thick leather gloves bought at the flower market, heavy enough for the fallen glass of the Glasswood.",
} as const satisfies StoryItem
