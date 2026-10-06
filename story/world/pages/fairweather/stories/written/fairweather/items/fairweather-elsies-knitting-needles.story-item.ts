import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherElsiesKnittingNeedles = {
  id: "01a11186-d828-7750-aa45-1a18a1f98295",
  type: "page-type/story-item",
  slug: "fairweather-elsies-knitting-needles",
  title: "Knitting Needles",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A pair of smooth pointed needles of polished birch.",
} as const satisfies StoryItem
