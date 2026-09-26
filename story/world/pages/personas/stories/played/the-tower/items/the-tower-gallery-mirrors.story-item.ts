import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerGalleryMirrors = {
  id: "01a0d445-2af0-7cfb-bed4-767c5a8c5f5c",
  type: "page-type/story-item",
  slug: "the-tower-gallery-mirrors",
  title: "The silvered gallery mirrors",
  story: "story-played/the-tower",
  place: "place/the-tower-the-long-gallery",
  description: "Silvered glass mirrors down both walls of the Long Gallery.",
} as const satisfies StoryItem
