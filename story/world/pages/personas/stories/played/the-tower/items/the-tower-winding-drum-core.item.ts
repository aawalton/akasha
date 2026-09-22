import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerWindingDrumCore = {
  id: "01a0ca52-ed6b-767b-8423-3ff749cca861",
  type: "page-type/item",
  slug: "the-tower-winding-drum-core",
  title: "winding-drum core",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description: "A dense coil of tension-wound iron, humming faintly with a stored force.",
} as const satisfies Item
