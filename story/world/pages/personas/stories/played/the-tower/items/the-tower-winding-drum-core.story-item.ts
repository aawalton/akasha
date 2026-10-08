import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerWindingDrumCore = {
  id: "01a0ca52-ed6b-767b-8423-3ff749cca861",
  type: "page-type/story-item",
  slug: "the-tower-winding-drum-core",
  title: "winding-drum core",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  essence: "tower-element/the-tower-force",
  description: "A dense coil of tension-wound iron, humming faintly with a stored force.",
  createdAt: "2026-09-22T18:13:47.499Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies StoryItem
