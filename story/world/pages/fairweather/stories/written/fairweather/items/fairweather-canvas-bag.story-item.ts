import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherCanvasBag = {
  id: "01a103fa-db8a-707e-9bf1-5747525b3cd5",
  type: "page-type/story-item",
  slug: "fairweather-canvas-bag",
  title: "Canvas Bag",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A plain canvas bag bought at the flower market, wide enough to carry plants.",
} as const satisfies StoryItem
