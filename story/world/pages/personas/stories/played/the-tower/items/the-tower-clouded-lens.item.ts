import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerCloudedLens = {
  id: "01a0ca53-1e14-7256-96f6-e014dc15fe95",
  type: "page-type/item",
  slug: "the-tower-clouded-lens",
  title: "Clouded lens",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description: "A palm-sized glass lens gone the grey-white of a blind eye, and colder than stone.",
} as const satisfies Item
