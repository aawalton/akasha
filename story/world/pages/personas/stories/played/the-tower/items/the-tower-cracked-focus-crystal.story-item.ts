import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerCrackedFocusCrystal = {
  id: "01a0d443-84bd-7afc-9078-f0f68b28b3d3",
  type: "page-type/story-item",
  slug: "the-tower-cracked-focus-crystal",
  title: "Cracked focus-crystal",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-alcove",
  description: "A cracked crystal carried by the robed corpse.",
} as const satisfies StoryItem
