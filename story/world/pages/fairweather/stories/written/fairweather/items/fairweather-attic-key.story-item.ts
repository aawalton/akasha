import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherAtticKey = {
  id: "01a102af-305c-7e34-8c9d-70cb77e2e06a",
  type: "page-type/story-item",
  slug: "fairweather-attic-key",
  title: "Attic Key",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description: "A small brass key to the attic room above the Honeycomb bakery.",
  createdAt: "2026-10-03T16:53:18.044Z",
  updatedAt: "2026-10-03T16:53:25.000Z",
} as const satisfies StoryItem
