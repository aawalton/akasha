import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerSnappedColdIronBlade = {
  id: "01a0ca52-fe25-74f3-a8fd-0fb675a45d7d",
  type: "page-type/item",
  slug: "the-tower-snapped-cold-iron-blade",
  title: "Snapped cold-iron blade",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  description: "A snapped length of cold iron, pitted, sheared off at a third of its length.",
} as const satisfies Item
