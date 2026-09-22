import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerBurningAnger = {
  id: "01a0ca4d-cd38-721a-9b3c-46141f024353",
  type: "page-type/item",
  slug: "the-tower-burning-anger",
  title: "Burning Anger",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  slot: "item-slot/main-hand",
} as const satisfies Item
